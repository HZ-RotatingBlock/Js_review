/* 
请求：http://baidu.com
1.用户通过浏览器发送一个http请求到指定的主机
2.服务器受到该请求，对该请求进行分析和处理
3.服务器处理完成后，返回对应的数据到用户机器
4.浏览器接收服务器返回的数据，并根据接收到的进行分析和处理

客户端 服务端
有客户端发送一个http请求到指定的服务端 -> 服务端接收并处理请求 -> 返回数据到客户端
*/
// http - http模块 - require("http")
//let http = retuire("http");
//------------------------------
//let server = http.crateServer([requestListener]):创建并返回一个HTTP服务器对象，参数requestListener:监听到客户端链接的回调函数,会被自动添加到"request"事件
//------------------------------
//server.listen(port,[hostname],[backlog],[callback]):监听客户端连接请求，只有当调用了listen方法以后，服务器才开始工作
//port:监听到的端口
//hostname:主机名（IP域名）
//backlog:连接等待队列的最大长度
//callback:调用listen方法并成功开启监听后，会触发一个listening事件，callback将作为该事件的执行函数
//------------------------------
//listening事件：当server调用listen方法并成功开始监听以后触发的事件
//------------------------------
//error事件：当服务器开启失败的时候触发的事件 - 参数err:具体的错误对象
//------------------------------
//request事件：当有客户端发送请求到该主机和端口的请求的时候触发 
//-参数request:http.IncommingMessage的一个实例，通过他我们可以获取到这次请求的一些信息，比如头信息，数据等
//-参数response:http.ServerResponse的一个实例，通过它我们可以向该次请求的客户端输出返回响应
//------------------------------
//参数request对象 -http.IncommingMessage
//-httpVersion:使用的http协议的版本
//-headers:请求信息中的数据
//-url:请求的地址
//-method:请求方式
//------------------------------
// 参数response对象 - http.ServerResponse
//- write(chunk,[enconding]):发送一个数据到相应正文中
//- end([chunk],[encoding]):当所有的正文和头信息发送完成以后调用该方法告诉服务器数据已经全部发送完成了，这个方法在每次完成信息发送以后必须调用，并且是最后调用
//- statusCode:该属性用来设置返回的状态码
//- setHeader(name,value):设置返回头信息
//- writeHeader(statusCode,[reasonPhrase],[headers]):这个方法只能在请求中使用一次，并且必须在reponse.end()之前调用,服务端返回的头信息，浏览器会根据头信息对返回的数据进行处理
//-------------------------------------
//__dirname： (全局)当前模块的文件夹名称。等同于 __filename 的 path.dirname() 的值