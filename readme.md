npm init
npm install webpack --save-dev


--github 排除文件上传
tmp.txt         //忽略tmp.txt
*.log           //忽略所有log文件
tmp/*           //忽略tmp文件夹所有文件
log/**/*.log    //忽略log目录下的包括子目录下的所有log文件
其他的一些过滤条件

？：代表任意的一个字符
＊：代表任意数目的字符
{!ab}：必须不是此类型
{ab,bb,cx}：代表ab,bb,cx中任一类型即可
[abc]：代表a,b,c中任一字符即可
[ ^abc]：代表必须不是a,b,c中任一字符

cmd
ren ignore.txt .gitignore