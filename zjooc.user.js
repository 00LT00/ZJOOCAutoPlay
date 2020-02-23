// ==UserScript==
// @name         ZJOOC自动下一课
// @namespace    https://github.com/ColdThunder11/ZJOOCAutoPlay
// @version      0.1
// @description  ZJOOC自动下一课
// @author       ColdThunder11
// @match        *://www.zjooc.cn/ucenter/student/course/study/*/plan/detail/*
// @grant        none
// @supportURL   https://github.com/ColdThunder11/ZJOOCAutoPlay
// @updateURL
// ==/UserScript==

(function() {
    'use strict';
    var startTime=20000;//第一次脚本开始时间（毫秒），在这个时间之前需要确保完成课程选择和课程加载，否则会报错
    var playInterval=12000;//课程播放间隔时间（毫秒），在这个时间之前需要确保完成课程加载，否则会报错
    var nextVideoFunc=function(){
        var currentTag=document.getElementsByClassName("el-tabs__item is-top is-active")[1];
        while(currentTag.nextSibling!=null){
            currentTag=currentTag.nextSibling;
            if(currentTag.childNodes[0].childNodes[2].innerText.substring(0,2)=="视频"){
                currentTag.click();
                window.setTimeout(playVideoFunc,playInterval-2000);
                return;
            }
        }
        var currentClass=document.getElementsByClassName("el-menu-item is-active")[1];
        var nextClass=currentClass.nextSibling;
        if(nextClass==null){
            currentClass.parentNode.parentNode.nextSibling.childNodes[0].click();
            nextClass=currentClass.parentNode.parentNode.nextSibling.childNodes[1].childNodes[1];
        }
        if(nextClass==null){
            alert("所有课程已经学习完毕。");
        }
        nextClass.click();
    }
    var playVideoFunc=function(){
        var vidf=document.getElementsByTagName("video")[0];
        if(vidf==null){
            alert("暂不支持文章内容！");
        }
        var cbf=vidf.parentNode.childNodes[2];
        var playLayerf=cbf.childNodes[0];
        playLayerf.click();
    };
    var detectiveFunc=function(){
        var vid=document.getElementsByTagName("video")[0];
        var cb=vid.parentNode.childNodes[2];
        var playLayer=cb.childNodes[0];
        var processBar=cb.childNodes[7];
        var processText;
        processText=processBar.innerText;
        var pctime=processText.split('/');
        var ctime=pctime[0].trim();
        var etime=pctime[1].trim();
        var currentTag=document.getElementsByClassName("el-tabs__item is-top is-active")[1];
        if(ctime==etime){
            nextVideoFunc();
            window.setTimeout(playVideoFunc,playInterval-2000);
            return;
        }
        //console.log(ctime+etime+"continue");
    };
    var ScritpFunc=function(){
        playVideoFunc();
        window.setInterval(detectiveFunc,playInterval);
    }

    window.setTimeout(ScritpFunc,startTime);
})();