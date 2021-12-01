# broadcastsms
simple tool to broadcast your message with react antd and php


![1](https://user-images.githubusercontent.com/82435592/144186632-71141d4f-9eda-4e7b-836e-b5211e2bbf2d.PNG)

![2](https://user-images.githubusercontent.com/82435592/144186800-e8d80cc6-c656-4e2b-92c4-248c1d3a9dec.PNG)

I add key.json in public so not just anyone can use it. maybe it's needed
you can change the key

also pay attention to the database connection in the php file
depending on your needs, just adjust..
if you use gammu maybe you can insert the message in the outbox
then gammu service will send your message

sample table :
CREATE TABLE `messagemt` (
 `messageid` varchar(100) NOT NULL,
 `userid` varchar(100) NOT NULL,
 `original` varchar(100) NOT NULL,
 `sendto` varchar(100) NOT NULL,
 `message` varchar(100) NOT NULL,
 `receivedate` date NOT NULL,
 PRIMARY KEY (`messageid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
