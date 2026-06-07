function generate(){
const data={
serverType:document.getElementById('serverType').value,
style:document.getElementById('style').value,
roles:['Owner','Admin','Moderator','Member'],
categories:['Information','Community','Support'],
bots:['Carl-bot','Ticket Tool']
};
document.getElementById('output').textContent=JSON.stringify(data,null,2);
}
function downloadJson(){
const text=document.getElementById('output').textContent;
const blob=new Blob([text],{type:'application/json'});
const a=document.createElement('a');
a.href=URL.createObjectURL(blob);
a.download='server-structure.json';
a.click();
}
