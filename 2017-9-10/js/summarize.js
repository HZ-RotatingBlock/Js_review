//__filename:当前模块文件被解析过后的绝对路径(注意是两个下划线),该属性并非全局下的，而是模块作用域下的
//__dirname:返回当前模块文件所在目录解析后的绝对路径，该属性也不是全局的，而是模块作用域下的
//****************************模块加载*******************************
//绝对路径:填写绝对路径;相对路径:与当前文件位置相对的路径(如果加载同文件层级下的js文件时没有./文件名的形式读取模块时，只是直接写文件名就会被nodejs默认加载核心模块或者是node_modules中的模块)
// 1-首先按照加载的模块文件名进行查找
// 2-如果没有找到，则会在模块文件名后加上js后缀进行查找
// 3-如果还是没有找到，则会在文件名称后加上.json的后缀进行查找
// 4-如果还是没有找到，则会在文件名后加上.node的后缀，进行查找
//在一个模块中通过var定义的变量，其作用域范围是当前模块，外部不能直击的访问，如果我们想一个模块能访问另一个模块当中定义的变量，可以：
// 1-变量作为global对象的一个属性(但是这种方法是不推荐的)
// 2-使用模块对象 module：保存和提供当前模块下的一些信息(它也属于模块下的而不是全局的),在这个module对象下有一个子对象，我们可以通过这个对象把一个模块中的局部变量对象机狠心提供访问,require方法的返回自更换其实就是被加载模块中的module.exports;在模块作用域内还有一个内置的模块对象，exports,他起始就是module.exports 
//****************************global全局对象***********************************
//---------------------process对象
//process对象:process对象是一个全局对象，可以在任何地方都能访问倒塌，通过这个对象的属性和方法，使我们可以对当前运行的程序的进程进行访问和控制,返回当前进程的一些信息
//argv:  -Array,一组包含命令行参数的数组
//execPath:  -开启当前进程的绝对路径
//env:  -返回用户环境信息
//version:返回node版本信息
//versions:返回node以及node依赖包版本信息
//pid:当前进程的pid
//title:当前进程的显示名称
//arch:返回当前CPU处理器架构 arm/ia32/x64
//platform:返回当前操作系统平台
//cwd():返回当前进程的工作目录
//chdir(directory):改变当前进程的工作目录
//memoryUsage():返回node进程的内存使用情况，单位是byte
//exit(code):退出
//kill(pid):向进程发送信息
// * stdin、stdout: 标准输入输出流（IO）；stdin和stdout提供了操作输入数据和输出数据的方法，我们也通常称为IO操作;stdin:标准输入流;stdout:标准输出流;
//process.stdin.on("data",(chunk) => {});用于监听用户输入的数据，其中匿名函数中会传入当前用户输入的数据（在这里是chunk ）,默认情况下，输入流是关闭的，要监听处理输入流数据，首先要开启输入流,调用process.stdin.resume();
//---------------------Buffer类
//Buffer类：一个用于更好的操作二进制数据的类
//我们在操邹文件或者网络数据的时候，起始操作的就是二进制数据流，node为我们提供了一个更加方便的去操作这种数据流的类Buffer,它是一个全局的类
//new Buffer(size);用于操作二进制数据流;size[Number]创建一个Buffer对象，并为这个对象分配一个大小,当我们为一个Buffer对象分配空间大小以后，其长度是固定的，不能更改(现在已经废弃，使用Buffer.alloc(size[,fill[,encoding]])或者Buffer.allocUnsafe(size)代替)
//new Buffer(array);(现在已经废弃,使用Buffer.from(array)代替)
//new Buffer(string,[encoding]);(现在已经废弃，使用Buffer.from(string[,encoding])代替)
//buf.length:buffer的bytes大小
//buf[index]:获取或者设置指定index索引位置的8位字节内容
//buf.write(string,[offset],[lenght],[encoding]):根据参数offset偏移量和指定的encoding编码方式，将参数string数据写入buffer
//buf.toString([encoding],[start],[end]):根据encoding参数（默认是"utf8")返回一个解码的string类型
//buf.toJSON():返回一个JSON表示的Buffer实例，JSON.stringify将会默认调用字符串序列化这个Buffer实例
//buf.slice([start[,end]]):返回一个新的buffer，这个buffer将会和老的buffer引用相同的内存地址注意：修改这个新的buffer实例slice切片，也会改变原来的buffer;
//buf.copy(target[,targetStart[,sourceStart[,sourceEnd]]]):进行buffer的拷贝,对拷贝出来的对象进行的更改并不会对被拷贝的buffer造成影响,第一参数是拷贝到新的buffer数据从第几位开始,第二个参数指拷贝从背拷贝buffer的第几位开始，第三个参数值拷贝至buffer的第几位结束
//Buffer.isEncoding(encodihg):如给定的编码encoding是有效的，返回true,否则返回false
//Buffer.isBuffer(obj):测试这个obj是否是一个Buffer
//Buffer.byteLength(strihg,[encoding]):将会返回这个字符串的真实byte长度，encoding编码默认是："utf8";不同的编码占据的字符长度是不一样的
//Buffer.concat(list,[totalLength]):返回一个保存着将传入buffer数组中所有buffer对于像拼接在一起的buffer对象
//****************************File System - 文件系统模块 - require('fs')***********************************
//该模块是核心模块，需要使用require导入后使用
//该模块提供了操作文件的一些API
// ---------fs.open(path,flags[,mode],callback):异步版的打开一个文件
// 第一个参数path是路径
// 第二个参数flags是指定文件的打开方式,常用的有 读/写;"r":以读取模式打开文件，如果文件不存在则发生异常;"r+":以读写模式打开文件，如果文件不存在则发生异常;"rs+":以同步读写模式打开文件，命令操作系统绕过本地文件缓存;
// 第三个参数mode是设置文件的模式 读/写/执行 4/2/1，第四个参数是callback，打开文件成功或失败执行的函数,传入2个参数;
// err:文件打开失败的错误保存在err里，若成功则err为null;
// fd：被打开的文件标示

// ---------fs.openSync(path,flags[,mode]):同步版的fs.open;同步的打开一个文件,不是使用会回调函数进行操作而是通过对返回值的操作

// ---------fs.read(fd,buffer,offset,length,position,callback):从自定的文档标识符fd读取文件数据
//fd:通过open方法成功打开一个文件返回的编号
//buffer:buffer对象
//offset:新的内容被添加到buffer中的起始位置
//length:添加到buffer中内容的长度
//position:读取的文件中的起始位置
//callback:回调函数接收三个参数 err,length(长度),buffer对象

//--------fs.readSync(fd,buffer,offset,length,position):fs.read函数的同步版本，返回bytesRead的个数

//--------fs.write(fd,buffer,offset,length[,position],callback):通过文件标识fd，向指定的文件总写入buffer
//buffer:要写入的数据
//offset:buffer对象中要写入的数据的起始位置
//length:要写入的buffer数据长度
//position:fd中的起始位置
//callback:回调


//--------fs.write(fd,data[,position[,encoding]],callback):把data写入到文档中通过指定的fd，如果data不是buffer对象的实例则会把值强制转换成一个字符串

// -------fs.writeSync(fd,buffer,offset,lenght[,position]):fs.write()的同步版本
// -------fs.writeSync(fd.data[,position[,encoding]]):fs.write()的同步版
//--------fs.close(fd,callback):关闭一个打开的文件
//--------fs.closeSync(fd):fs.close()的同步版本

// -------fs.writeFile(filename,data,[options],callback):异步的将数据写入一个文件，如果文件不存则则新建，如果原先文件存在将替换;data可以是一个string，也可以是一个原生buffer
// -------fs.writeFileSync(filename,data,[options]):fs.writeFile的同步版本，注意，没有callback,也不需要
// -------fs.apendFile(filename,data,[options],callback):异步的将数据添加到文件的尾部，如果文件不存在则会创建一个新的文件，data可以是一个string，也可以是原生buffer;
// -------fs.appendFileSync(filename,data,[options]):fs.appendFile的同步版本

// -------fs.access(path[,mode],callback):测试path指定的文件或目录的用户权限
// mode是一个可选整数，指定要执行的可访问性检查，以下常量定义了mode的可能值，可以创建由两个或更多个值的位或组成的掩码
// fs.constants.F_OK - path 文件对调用进程可见，这在确定文件是否存在时很有用，但不涉及rwx权限，如果没指定mode,则默认为该值
// fs.constants,R_OK - path 文件可被调用进程读取
// fs.constants.W_OK - path 文件可被调用进程写入
// fs.constants.X_OK - path 文件可被调用进程执行，对Window系统没用（相当于fs.constants.F_OK）

//------fs.readFile(filename,[options],callback):异步读取一个文件的全部内容
//------fs.readFileSync(filename,[options]):fs.readFile同步版本
//------fs.unlink(path,callback):删除一个文件
//------fs.unlinkSync(path):fs.unlink的同步版本
//------fs.stat(path,callback):读取文件信息
//------fs.statSync(path,callback):fs.stat()的同步版本
//------fs.watch(filename,[options],[listener]):观察指定路径的改变，filename路径可以是文件或者目录,当文件重命名或者内容发生改变时就会触发相应事件,监听回调listener有两个参数，eventType和fillname,eventType可以是rename和change,filename是触发事件的文件名称

//------fs.mkdir(path,[mode],callback):创建文件夹
//------fs.mkdirSync(path,[mode]):fs.mkdir的同步版本
//------fs.readdir(path,callback):读取文件夹
//------fs.readdirSync(path):fs.readdir同步版本
//------fs.rmdir(path,callback):删除文件夹
//------fs.remdirSync(path):fs.rmdir的同步版本
require("./2.js");
console.log(__filename);