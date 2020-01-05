export default class DrawService {

    static instance;

    constructor() {
        this.noDuplicate = true;
        this.isRolling = false;
        this.isPickBlocked = false;
        this.selectedParticipants = {"selectedParticipants":[]};
        this.currentlySelectedIndexs = [];
        this.currentCount = 0;
        this.currentNum = 0;
        this.selectItems = [];
    }

    static from(all) {
        if (!DrawService.instance) {
            DrawService.instance = new DrawService();
        }

        DrawService.instance.all = all;
        return DrawService.instance;
    }

    rollUp(currentCount, currentNum,selectItems) {
        this.currentCount = currentCount;
        this.currentNum = currentNum;
        this.selectItems = selectItems;
        if (!this.isRolling) {
            clearInterval(this.timer);
            if (this.all.length === 0) {
                throw new Error("No item in pool");
            }
            this.isRolling = true;
            this.timer = setInterval(this.change.bind(this), 80);
        }
        return this;
    }

    removeItem(oneItemIndex) {
        this.all.splice(oneItemIndex, 1);
    }

    change() {
        let eachNums = this.currentCount / this.currentNum;
        this.currentlySelectedIndexs.splice(0);
        this.selectedParticipants.selectedParticipants.splice(0);

        for (let i = 0; i < eachNums; i++) {
            let index = Math.floor(Math.random() * this.all.length);
            let flag = true;
            while (flag){
                index = Math.floor(Math.random() * this.all.length);
                if(this.currentlySelectedIndexs.indexOf(index)>=0){
                    continue;
                }

                let tempFlag = false;
                for (let j = 0; j < this.selectItems.length; j++) {
                    this.currentlySelectedItem = this.all[index];
                    if( this.currentlySelectedItem.name === this.selectItems[j].name &&  this.currentlySelectedItem.phone === this.selectItems[j].phone) {
                        tempFlag = true;
                        break;
                    }
                }
                if(!tempFlag){
                    flag = false;
                }
            }
            this.currentlySelectedIndex = index;
            this.currentlySelectedIndexs.push(this.currentlySelectedIndex)
            this.currentlySelectedItem = this.all[index];
            this.selectedParticipants.selectedParticipants.push(this.currentlySelectedItem);
        }

        this.onSelectedChangedCallback(this.selectedParticipants);
    }

    setOnSelectedChangedCallback(callback) {
        this.onSelectedChangedCallback = callback;
        return this;
    }

    setOnPickBlockedChangedCallback(callback) {
        this.onPickBlockedChangedCallback = callback;
        return this;
    }

    setNoDuplicate(noDuplicate = true) {
        this.noDuplicate = noDuplicate;
        return this;
    }

    setPickBlocked(blocked) {
        this.isPickBlocked = blocked;
        this.onPickBlockedChangedCallback(blocked);
    }

    pickOneThenDo(callback) {

        if (!this.isPickBlocked) {
            this.setPickBlocked(true);
            setTimeout((() => {
                clearInterval(this.timer);
                if (this.noDuplicate) {
                    // for (let i = 0; i < this.currentlySelectedIndexs.length; i++) {
                    //     this.removeItem(this.currentlySelectedIndexs[i]);
                    // }
                }
                callback(this.selectedParticipants,this.currentlySelectedIndexs);
                this.isRolling = false;
                this.setPickBlocked(false);
            }).bind(this), 1000, this);
        }
    }
}
