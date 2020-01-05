import React, {Component} from 'react';
import PropTypes from 'prop-types';

import DrawService from "../../service/DrawService";
import {addWinner} from '../../redux/actions/lotteryPool';
import maskPhone from '../../utils/phone_mask';
import {connect} from 'react-redux';
import TagCloud from "../common/tag-cloud";
import './lottery-drawing.css'

class LotteryDrawing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedParticipant: {"selectedParticipants":[]},
            currentPrize: '',
            isPrizeChanged: false,
            btnDisabled: false,
        };
    }

    render() {
        return (
            <div className={"lottery-drawing"}>
                <div className="name-cloud-container">
                    <TagCloud tags={this.props.allParticipants.map(participant => participant.name)}/>
                </div>
                <div>
                    <header className={'prize-title'}>
                        {this.getTitle()}
                    </header>
                    <div className={'rolling'}>
                        {this.getContent()}
                    </div>
                    <button className={this.state.btnDisabled ? "wait" : ""} disabled={this.state.btnDisabled}
                            onClick={this.onClick.bind(this)}>{this.getButton()}</button>
                </div>
            </div>
        );
    }

    onClick = () => {
        if (this.state.noPrize) {
            this.props.history.push("/result");
        } else {
            if (this.state.isPrizeChanged) {
                this.setState({
                    isPrizeChanged: false,
                });
                this.computeCurrentPrize();
                return;
            }
            try {
                if (this.drawService.isRolling) {
                    this.drawService.pickOneThenDo((selected,selectedIndexs) => {
                        for (let i = 0; i < selected.selectedParticipants.length; i++) {
                            selected.selectedParticipants[i].prize = this.state.currentPrize;
                            this.props.addWinner(selected.selectedParticipants[i]);
                        }

                        for (let i = 0; i < selectedIndexs.length; i++) {
                            this.drawService.removeItem(selectedIndexs[i]);
                        }

                        this.computeCurrentPrize();
                    })
                } else {
                    let selectItems = this.props.lotteryPool.winners;
                    this.drawService.rollUp(this.state.currentPrize.totalCount, this.state.currentPrize.totalNum,selectItems);
                }
            } catch (err) {
                console.error(err.message)
            }
        }

    };

    getCurrentPrize = (next) => {
        let items = this.props.lotteryPool.winners.filter(winner => (winner.prize.id === this.state.currentPrize.id));
        if (!next && (this.state.currentPrize.totalCount - items.length || 0) >= 0 && this.state.currentPrize) {
            if ((this.state.currentPrize.totalCount - items.length || 0) === 0) {
                this.setState({
                    isPrizeChanged: true,
                });
            }
            return this.state.currentPrize;
        }

        return this.props.lotteryDrawing.setting.find((lottery) => {
                let items = this.props.lotteryPool.winners.filter(winner => (winner.prize.id === lottery.id));
                if ((lottery.totalCount - items.length || 0) <= 0) {
                    this.state.selectedParticipant.selectedParticipants.splice(0);
                    return false;
                }
                return true
            }
        );
    };
    computeCurrentPrize = () => {
        let currentPrize = this.getCurrentPrize(this.state.isPrizeChanged);
        if (currentPrize) {
            let existingCountOfCurrentPrize = this.props.lotteryPool.winners.filter(winner => winner.prize.id === currentPrize.id).length;
            this.setState({
                currentPrize,
                existingCountOfCurrentPrize
            });
        } else {
            this.setState({
                noPrize: true
            });
        }
        return currentPrize;
    };
    getTitle = () => {
        if (this.state.existingCountOfCurrentPrize === 0 && !this.state.isPrizeChanged) {
            return `${this.state.currentPrize.title}(${this.state.currentPrize.totalCount}名)`
        } else if (this.state.noPrize) {
            return "";
        }
        return `${this.state.currentPrize.title}(${this.state.existingCountOfCurrentPrize} / ${this.state.currentPrize.totalCount})`
    };

    getContent = () => {
        if ((!this.state.selectedParticipant.selectedParticipants.phone || (this.state.existingCountOfCurrentPrize === 0 && !this.drawService.isRolling && !this.state.isPrizeChanged)) && this.state.selectedParticipant.selectedParticipants.length <= 0 && !this.state.noPrize ) {
            return "等待开奖";
        } else if (this.state.noPrize) {
            return "抽奖结束";
        }

        const everyPrizes = [];
        if(this.state.isPrizeChanged || this.state.selectedParticipant.selectedParticipants.length>0){
            for (let i = 0; i < this.state.selectedParticipant.selectedParticipants.length; i++) {
                everyPrizes.push(
                    <div className="name" key={"name_0"+i}>&nbsp;&nbsp;&nbsp;&nbsp;{this.state.selectedParticipant.selectedParticipants[i].name}</div>
            );
                everyPrizes.push(
                    <div className="phone" key={"phone_0"+i}>&nbsp;&nbsp;&nbsp;&nbsp;{maskPhone(this.state.selectedParticipant.selectedParticipants[i].phone, '😝😝😝😝')}</div>
                );


                let flag = parseInt(parseInt(this.state.currentPrize.totalCount) / parseInt(this.state.currentPrize.totalNum) );
                if(flag >= 4){
                    if(i%2 === 0){
                        everyPrizes.push(
                            <br key={"br_"+i}/>
                        );
                    }
                }
            }
        } else {
            everyPrizes.push(
                <div className="name">{this.state.selectedParticipant.selectedParticipants[0].name}</div>
            );
            everyPrizes.push(
                <div className="phone">{maskPhone(this.state.selectedParticipant.selectedParticipants[0].phone, '😝😝😝😝')}</div>
            );
        }

        return (<div className="selectedParticipant">
            {everyPrizes}
        </div>)
    };

    getButton = () => {
        if (this.state.noPrize) {
            return "抽奖结果";
        } else if (this.drawService) {
            return this.drawService.isRolling ? "stop" : (this.state.isPrizeChanged ? "next" : "start")
        }
        return '';
    };

    launchFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

    componentDidMount() {
        const totalLotteryCount = this.props.lotteryDrawing.setting.reduce((sum, l) => (sum + l.totalCount), 0);
        if (this.props.allParticipants.length < totalLotteryCount) {
            alert("奖项数大于参与者数！");
            this.props.history.goBack();
            return;
        }

        let flag = true;
        this.props.lotteryDrawing.setting.forEach((value,index)=>{
           if(value.totalCount%value.totalNum !==0 ){
               alert(value.title+"中[抽奖次数]要被参与[人数]整除！");
               this.props.history.goBack();
               flag = false;
               return;
           }
        });
        if(!flag){
            return;
        }

        this.launchFullscreen(document.documentElement);
        this.drawService = DrawService.from(this.props.allParticipants)
            .setOnSelectedChangedCallback((selectedItem) => {
                this.setState({
                    selectedParticipant: selectedItem,
                });
            })
            .setNoDuplicate(true)
            .setOnPickBlockedChangedCallback((blocked) => {
                this.setState({
                    btnDisabled: blocked
                });
            });
        this.computeCurrentPrize();
    }
}

LotteryDrawing.propTypes = {
    addWinner: PropTypes.func.isRequired,
    // currentPrize: PropTypes.shape(),
};
const mapStateToProps = state => ({
    allParticipants: state.dataReducer.lotteryPool.allParticipants,
    lotteryPool: state.dataReducer.lotteryPool,
    lotteryDrawing: state.dataReducer.lotteryDrawing
});
export default connect(mapStateToProps, {addWinner})(LotteryDrawing);
