!function(modules){var parentHotUpdateCallback=window.webpackHotUpdate;window.webpackHotUpdate=function(chunkId,moreModules){!function(chunkId,moreModules){if(!hotAvailableFilesMap[chunkId]||!hotRequestedFilesMap[chunkId])return;for(var moduleId in hotRequestedFilesMap[chunkId]=!1,moreModules)Object.prototype.hasOwnProperty.call(moreModules,moduleId)&&(hotUpdate[moduleId]=moreModules[moduleId]);0===--hotWaitingFiles&&0===hotChunksLoading&&hotUpdateDownloaded()}(chunkId,moreModules),parentHotUpdateCallback&&parentHotUpdateCallback(chunkId,moreModules)};var hotCurrentChildModule,hotApplyOnUpdate=!0,hotCurrentHash="70817a9f019ea0370749",hotRequestTimeout=1e4,hotCurrentModuleData={},hotCurrentParents=[],hotCurrentParentsTemp=[];function hotCreateRequire(moduleId){var me=installedModules[moduleId];if(!me)return __webpack_require__;var fn=function(request){return me.hot.active?(installedModules[request]?installedModules[request].parents.indexOf(moduleId)<0&&installedModules[request].parents.push(moduleId):(hotCurrentParents=[moduleId],hotCurrentChildModule=request),me.children.indexOf(request)<0&&me.children.push(request)):(console.warn("[HMR] unexpected require("+request+") from disposed module "+moduleId),hotCurrentParents=[]),__webpack_require__(request)},ObjectFactory=function(name){return{configurable:!0,enumerable:!0,get:function(){return __webpack_require__[name]},set:function(value){__webpack_require__[name]=value}}};for(var name in __webpack_require__)Object.prototype.hasOwnProperty.call(__webpack_require__,name)&&"e"!==name&&Object.defineProperty(fn,name,ObjectFactory(name));return fn.e=function(chunkId){return"ready"===hotStatus&&hotSetStatus("prepare"),hotChunksLoading++,__webpack_require__.e(chunkId).then(finishChunkLoading,function(err){throw finishChunkLoading(),err});function finishChunkLoading(){hotChunksLoading--,"prepare"===hotStatus&&(hotWaitingFilesMap[chunkId]||hotEnsureUpdateChunk(chunkId),0===hotChunksLoading&&0===hotWaitingFiles&&hotUpdateDownloaded())}},fn}var hotStatusHandlers=[],hotStatus="idle";function hotSetStatus(newStatus){hotStatus=newStatus;for(var i=0;i<hotStatusHandlers.length;i++)hotStatusHandlers[i].call(null,newStatus)}var hotDeferred,hotUpdate,hotUpdateNewHash,hotWaitingFiles=0,hotChunksLoading=0,hotWaitingFilesMap={},hotRequestedFilesMap={},hotAvailableFilesMap={};function toModuleId(id){return+id+""===id?+id:id}function hotCheck(apply){if("idle"!==hotStatus)throw new Error("check() is only allowed in idle status");return hotApplyOnUpdate=apply,hotSetStatus("check"),(requestTimeout=hotRequestTimeout,requestTimeout=requestTimeout||1e4,new Promise(function(resolve,reject){if("undefined"===typeof XMLHttpRequest)return reject(new Error("No browser support"));try{var request=new XMLHttpRequest,requestPath=__webpack_require__.p+""+hotCurrentHash+".hot-update.json";request.open("GET",requestPath,!0),request.timeout=requestTimeout,request.send(null)}catch(err){return reject(err)}request.onreadystatechange=function(){if(4===request.readyState)if(0===request.status)reject(new Error("Manifest request to "+requestPath+" timed out."));else if(404===request.status)resolve();else if(200!==request.status&&304!==request.status)reject(new Error("Manifest request to "+requestPath+" failed."));else{try{var update=JSON.parse(request.responseText)}catch(e){return void reject(e)}resolve(update)}}})).then(function(update){if(!update)return hotSetStatus("idle"),null;hotRequestedFilesMap={},hotWaitingFilesMap={},hotAvailableFilesMap=update.c,hotUpdateNewHash=update.h,hotSetStatus("prepare");var promise=new Promise(function(resolve,reject){hotDeferred={resolve:resolve,reject:reject}});hotUpdate={};return hotEnsureUpdateChunk(0),"prepare"===hotStatus&&0===hotChunksLoading&&0===hotWaitingFiles&&hotUpdateDownloaded(),promise});var requestTimeout}function hotEnsureUpdateChunk(chunkId){hotAvailableFilesMap[chunkId]?(hotRequestedFilesMap[chunkId]=!0,hotWaitingFiles++,function(chunkId){var head=document.getElementsByTagName("head")[0],script=document.createElement("script");script.type="text/javascript",script.charset="utf-8",script.src=__webpack_require__.p+""+chunkId+"."+hotCurrentHash+".hot-update.js",head.appendChild(script)}(chunkId)):hotWaitingFilesMap[chunkId]=!0}function hotUpdateDownloaded(){hotSetStatus("ready");var deferred=hotDeferred;if(hotDeferred=null,deferred)if(hotApplyOnUpdate)Promise.resolve().then(function(){return hotApply(hotApplyOnUpdate)}).then(function(result){deferred.resolve(result)},function(err){deferred.reject(err)});else{var outdatedModules=[];for(var id in hotUpdate)Object.prototype.hasOwnProperty.call(hotUpdate,id)&&outdatedModules.push(toModuleId(id));deferred.resolve(outdatedModules)}}function hotApply(options){if("ready"!==hotStatus)throw new Error("apply() is only allowed in ready status");var cb,i,j,module,moduleId;function getAffectedStuff(updateModuleId){for(var outdatedModules=[updateModuleId],outdatedDependencies={},queue=outdatedModules.slice().map(function(id){return{chain:[id],id:id}});queue.length>0;){var queueItem=queue.pop(),moduleId=queueItem.id,chain=queueItem.chain;if((module=installedModules[moduleId])&&!module.hot._selfAccepted){if(module.hot._selfDeclined)return{type:"self-declined",chain:chain,moduleId:moduleId};if(module.hot._main)return{type:"unaccepted",chain:chain,moduleId:moduleId};for(var i=0;i<module.parents.length;i++){var parentId=module.parents[i],parent=installedModules[parentId];if(parent){if(parent.hot._declinedDependencies[moduleId])return{type:"declined",chain:chain.concat([parentId]),moduleId:moduleId,parentId:parentId};outdatedModules.indexOf(parentId)>=0||(parent.hot._acceptedDependencies[moduleId]?(outdatedDependencies[parentId]||(outdatedDependencies[parentId]=[]),addAllToSet(outdatedDependencies[parentId],[moduleId])):(delete outdatedDependencies[parentId],outdatedModules.push(parentId),queue.push({chain:chain.concat([parentId]),id:parentId})))}}}}return{type:"accepted",moduleId:updateModuleId,outdatedModules:outdatedModules,outdatedDependencies:outdatedDependencies}}function addAllToSet(a,b){for(var i=0;i<b.length;i++){var item=b[i];a.indexOf(item)<0&&a.push(item)}}options=options||{};var outdatedDependencies={},outdatedModules=[],appliedUpdate={},warnUnexpectedRequire=function(){console.warn("[HMR] unexpected require("+result.moduleId+") to disposed module")};for(var id in hotUpdate)if(Object.prototype.hasOwnProperty.call(hotUpdate,id)){var result;moduleId=toModuleId(id);var abortError=!1,doApply=!1,doDispose=!1,chainInfo="";switch((result=hotUpdate[id]?getAffectedStuff(moduleId):{type:"disposed",moduleId:id}).chain&&(chainInfo="\nUpdate propagation: "+result.chain.join(" -> ")),result.type){case"self-declined":options.onDeclined&&options.onDeclined(result),options.ignoreDeclined||(abortError=new Error("Aborted because of self decline: "+result.moduleId+chainInfo));break;case"declined":options.onDeclined&&options.onDeclined(result),options.ignoreDeclined||(abortError=new Error("Aborted because of declined dependency: "+result.moduleId+" in "+result.parentId+chainInfo));break;case"unaccepted":options.onUnaccepted&&options.onUnaccepted(result),options.ignoreUnaccepted||(abortError=new Error("Aborted because "+moduleId+" is not accepted"+chainInfo));break;case"accepted":options.onAccepted&&options.onAccepted(result),doApply=!0;break;case"disposed":options.onDisposed&&options.onDisposed(result),doDispose=!0;break;default:throw new Error("Unexception type "+result.type)}if(abortError)return hotSetStatus("abort"),Promise.reject(abortError);if(doApply)for(moduleId in appliedUpdate[moduleId]=hotUpdate[moduleId],addAllToSet(outdatedModules,result.outdatedModules),result.outdatedDependencies)Object.prototype.hasOwnProperty.call(result.outdatedDependencies,moduleId)&&(outdatedDependencies[moduleId]||(outdatedDependencies[moduleId]=[]),addAllToSet(outdatedDependencies[moduleId],result.outdatedDependencies[moduleId]));doDispose&&(addAllToSet(outdatedModules,[result.moduleId]),appliedUpdate[moduleId]=warnUnexpectedRequire)}var idx,outdatedSelfAcceptedModules=[];for(i=0;i<outdatedModules.length;i++)moduleId=outdatedModules[i],installedModules[moduleId]&&installedModules[moduleId].hot._selfAccepted&&outdatedSelfAcceptedModules.push({module:moduleId,errorHandler:installedModules[moduleId].hot._selfAccepted});hotSetStatus("dispose"),Object.keys(hotAvailableFilesMap).forEach(function(chunkId){!1===hotAvailableFilesMap[chunkId]&&function(chunkId){delete installedChunks[chunkId]}(chunkId)});for(var dependency,moduleOutdatedDependencies,queue=outdatedModules.slice();queue.length>0;)if(moduleId=queue.pop(),module=installedModules[moduleId]){var data={},disposeHandlers=module.hot._disposeHandlers;for(j=0;j<disposeHandlers.length;j++)(cb=disposeHandlers[j])(data);for(hotCurrentModuleData[moduleId]=data,module.hot.active=!1,delete installedModules[moduleId],delete outdatedDependencies[moduleId],j=0;j<module.children.length;j++){var child=installedModules[module.children[j]];child&&((idx=child.parents.indexOf(moduleId))>=0&&child.parents.splice(idx,1))}}for(moduleId in outdatedDependencies)if(Object.prototype.hasOwnProperty.call(outdatedDependencies,moduleId)&&(module=installedModules[moduleId]))for(moduleOutdatedDependencies=outdatedDependencies[moduleId],j=0;j<moduleOutdatedDependencies.length;j++)dependency=moduleOutdatedDependencies[j],(idx=module.children.indexOf(dependency))>=0&&module.children.splice(idx,1);for(moduleId in hotSetStatus("apply"),hotCurrentHash=hotUpdateNewHash,appliedUpdate)Object.prototype.hasOwnProperty.call(appliedUpdate,moduleId)&&(modules[moduleId]=appliedUpdate[moduleId]);var error=null;for(moduleId in outdatedDependencies)if(Object.prototype.hasOwnProperty.call(outdatedDependencies,moduleId)&&(module=installedModules[moduleId])){moduleOutdatedDependencies=outdatedDependencies[moduleId];var callbacks=[];for(i=0;i<moduleOutdatedDependencies.length;i++)if(dependency=moduleOutdatedDependencies[i],cb=module.hot._acceptedDependencies[dependency]){if(callbacks.indexOf(cb)>=0)continue;callbacks.push(cb)}for(i=0;i<callbacks.length;i++){cb=callbacks[i];try{cb(moduleOutdatedDependencies)}catch(err){options.onErrored&&options.onErrored({type:"accept-errored",moduleId:moduleId,dependencyId:moduleOutdatedDependencies[i],error:err}),options.ignoreErrored||error||(error=err)}}}for(i=0;i<outdatedSelfAcceptedModules.length;i++){var item=outdatedSelfAcceptedModules[i];moduleId=item.module,hotCurrentParents=[moduleId];try{__webpack_require__(moduleId)}catch(err){if("function"===typeof item.errorHandler)try{item.errorHandler(err)}catch(err2){options.onErrored&&options.onErrored({type:"self-accept-error-handler-errored",moduleId:moduleId,error:err2,orginalError:err,originalError:err}),options.ignoreErrored||error||(error=err2),error||(error=err)}else options.onErrored&&options.onErrored({type:"self-accept-errored",moduleId:moduleId,error:err}),options.ignoreErrored||error||(error=err)}}return error?(hotSetStatus("fail"),Promise.reject(error)):(hotSetStatus("idle"),new Promise(function(resolve){resolve(outdatedModules)}))}var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={i:moduleId,l:!1,exports:{},hot:function(moduleId){var hot={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],_main:hotCurrentChildModule!==moduleId,active:!0,accept:function(dep,callback){if("undefined"===typeof dep)hot._selfAccepted=!0;else if("function"===typeof dep)hot._selfAccepted=dep;else if("object"===typeof dep)for(var i=0;i<dep.length;i++)hot._acceptedDependencies[dep[i]]=callback||function(){};else hot._acceptedDependencies[dep]=callback||function(){}},decline:function(dep){if("undefined"===typeof dep)hot._selfDeclined=!0;else if("object"===typeof dep)for(var i=0;i<dep.length;i++)hot._declinedDependencies[dep[i]]=!0;else hot._declinedDependencies[dep]=!0},dispose:function(callback){hot._disposeHandlers.push(callback)},addDisposeHandler:function(callback){hot._disposeHandlers.push(callback)},removeDisposeHandler:function(callback){var idx=hot._disposeHandlers.indexOf(callback);idx>=0&&hot._disposeHandlers.splice(idx,1)},check:hotCheck,apply:hotApply,status:function(l){if(!l)return hotStatus;hotStatusHandlers.push(l)},addStatusHandler:function(l){hotStatusHandlers.push(l)},removeStatusHandler:function(l){var idx=hotStatusHandlers.indexOf(l);idx>=0&&hotStatusHandlers.splice(idx,1)},data:hotCurrentModuleData[moduleId]};return hotCurrentChildModule=void 0,hot}(moduleId),parents:(hotCurrentParentsTemp=hotCurrentParents,hotCurrentParents=[],hotCurrentParentsTemp),children:[]};return modules[moduleId].call(module.exports,module,module.exports,hotCreateRequire(moduleId)),module.l=!0,module.exports}__webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.d=function(exports,name,getter){__webpack_require__.o(exports,name)||Object.defineProperty(exports,name,{configurable:!1,enumerable:!0,get:getter})},__webpack_require__.n=function(module){var getter=module&&module.__esModule?function(){return module.default}:function(){return module};return __webpack_require__.d(getter,"a",getter),getter},__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)},__webpack_require__.p="./",__webpack_require__.h=function(){return hotCurrentHash},hotCreateRequire("./app/js/app.js")(__webpack_require__.s="./app/js/app.js")}({"./app/js/app.js":function(module,exports,__webpack_require__){"use strict";__webpack_require__("./app/scss/style.scss");var obj,_AppManager=(obj=__webpack_require__("./app/js/managers/AppManager.js"))&&obj.__esModule?obj:{default:obj};!function(){console.log("hello");var xmlhttp=new XMLHttpRequest;xmlhttp.onreadystatechange=function(){if(4===this.readyState&&200===this.status){var myArr=JSON.parse(this.responseText);console.log(myArr),_AppManager.default.start()}},xmlhttp.open("GET","https://uqstaging.com/instagram/",!0),xmlhttp.send()}()},"./app/js/managers/AppManager.js":function(module,exports,__webpack_require__){"use strict";function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _default=new(function(){function AppManager(){!function(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,AppManager)}var Constructor,protoProps,staticProps;return Constructor=AppManager,(protoProps=[{key:"start",value:function(){console.log("start")}}])&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),AppManager}());exports.default=_default},"./app/scss/style.scss":function(module,exports){}});
//# sourceMappingURL=bundle.js.map