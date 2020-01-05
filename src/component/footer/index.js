import React from 'react';

const Footer = (props) => (
      <footer className={props.className}>
        ©{new Date().getFullYear()}
        <span> <a target='_blank' href={{__html: 'javascript:volid(0);'}}>信息中心</a> </span>
        All Rights Reversed.
        <span>  <a target='_blank' href='https://github.com/canjian215215/Fly-LuckyDraw.git'>Github</a> </span>
      </footer>
);

export default Footer;
