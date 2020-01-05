# Fly-LuckyDraw


Fly-LuckyDraw，本系统是一款免费开源的滚动抽奖系统，适用于公司年会、大型聚会等各种场景。Fly-LuckDraw是在Magpie-LuckyDraw开源系统的基础上修改而来。

### 支持特性

- [x] 3D标签云显示参与者姓名
- [x] 获奖者不重复中奖
- [x] 奖项编辑：奖项数设置、奖项的编辑、每项抽奖次数设置以及抽取的出场顺序
- [x] 灾难恢复，意外退出浏览器页面时，二次访问时可以恢复上次抽奖信息
- [x] 支持Windows、Linux、MacOSX、网页端、Docker等多平台

### 预期支持特性

- [ ] 手机小程序或APP控制抽奖过程
- [ ] 云端支持，在服务器实现抽奖
- [ ] 集成金数据等活动信息收集平台

## 一、 使用

### 1. Web端在线使用

[点击使用：https://magpie.wangbaiyuan.cn](https://magpie.wangbaiyuan.cn)

### 2. 桌面版下载安装

下载软件包在本地运行
- [Windows版](https://github.com/geekeren/Magpie-LuckyDraw/releases)
- [MAC版](https://github.com/geekeren/Magpie-LuckyDraw/releases)
- [Linux版](https://github.com/geekeren/Magpie-LuckyDraw/releases)

### 3. 使用Docker本地运行

本项目已Docker化并托管于Docker hub平台，您可以在安装了Docker环境的情况下执行：

`docker run -p 80:80 bywang/magpie`启动Magpie抽奖服务

你也可以clone本项目，在本地使用`yarn start` 启动服务


### 4. 下载源代码构建运行
```
git clone https://github.com/canjian215215/Fly-LuckyDraw.git
cd Fly-LuckyDraw
yarn install
yarn start
```
- 构建命令：`yarn build`

## 二、预览
![预览](assets/image/drawing.gif)
