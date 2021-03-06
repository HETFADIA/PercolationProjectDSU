// using element i have selected all the above boxes
var element = document.getElementsByClassName("container");
var TotalCells= element.length;
var lengthOfTopRow= Math.floor(Math.sqrt(TotalCells));
// using percolatevar i have selected all the boxes in which the text changes
var percolatevar = document.getElementsByClassName("changetext");
// dict maps all the element to one which have been clicked odd number of times and other to 0
var dict = []

// in visited i have stored all the egdes which have been visited during the dfs
var visited = []
var adj=[]
var rank= []
var parent=[]


function find(x){
    while(parent[x]!=x){
        x=parent[x];
    }
    return parent[x];
}
function union(x,y){
    xparent=find(x)
    yparent=find(y)

    if (xparent==yparent){
        return;
    }

    if(rank[xparent]<rank[yparent]){
        parent[xparent]=yparent;
    }
    else if(rank[xparent]>rank[yparent]){
        parent[yparent]=xparent;
    }
    else{
        parent[yparent]=xparent;
        rank[xparent]=rank[xparent]+1;
    }
}

function initialize(){
    rank=[]
    parent=[]
    for (let i = 0; i < TotalCells+2; i++) {
        rank[i]=1;
        parent[i]=i;
    }
    for(let i=0;i<lengthOfTopRow;i++){
        union(TotalCells+1,i);
    }
    for(let i=TotalCells-lengthOfTopRow;i<TotalCells;i++){
        union(TotalCells+2,i);
    }
}
function percolatesOrNot(){
    return find(TotalCells+2)==find(TotalCells+1);
}
function reset() {
    console.log("reset")
    dict=[]
    visited=[]
    adj=[]
    for (var i = 0; i < TotalCells+2; i++) {
        dict.push(0);
        visited.push(0);
        adj.push([]);
    }
    for (var i = 0; i < TotalCells; i++) {
        element[i].style.backgroundColor = "black"
        // percolatevar[1].style.color="red";
    }
    count = 0
    watercells = 0;
    percolatevar[1].innerHTML = "System Does Not Percolate"
    percolatevar[0].innerHTML = "The percentage of active cells is:" + ((count / TotalCells) * 100).toFixed(2) + "%" + "<br>"
    percolatevar[0].innerHTML += "The percentage of water occupied cells is:" + ((watercells / TotalCells) * 100).toFixed(2) + "%"

    initialize();
}
function updateVisited(){
    function addedge(u, v) {
        adj[v].push(u);
        adj[u].push(v);
    }
    function addUniDirectEdge(u, v) {
        adj[u].push(v);
    }
    for (var i = 0; i < lengthOfTopRow; i++) {
        addedge(i, TotalCells+1);
    }
    for (var i = TotalCells - lengthOfTopRow; i < TotalCells; i++) {
        addUniDirectEdge(i, TotalCells+2);
    }
    for (var i = 0; i < TotalCells; i++) {
        if (dict[i] == 1 & dict[i + lengthOfTopRow] == 1) {
            addedge(i, i + lengthOfTopRow);
        }
        if ((i+1) % lengthOfTopRow != 0 & dict[i] == 1 & dict[i + 1] == 1) {
            addedge(i, i + 1);
        }
    }
    function printOne(v) {
        if (visited[v] == 0) {

            dfs(v);
        }
    }
    function dfs(v) {
        visited[v] = 1;
        adj[v].forEach(printOne);
    }
    dfs(TotalCells+1);

}
function updatestats(){
    updateVisited();
    for (var i = 0; i < TotalCells; i++) {
        if (dict[i] == 1 & visited[i] == 1) {
            element[i].style.backgroundColor = "blue";
            watercells++;
            count++;

        }
        else if (visited[i] == 0 & dict[i] == 1) {
            element[i].style.backgroundColor = "green";
            count++;
        }
        else{
            element[i].style.backgroundColor="black";
        }
    }
    percolatevar[0].innerHTML = "The number and percentage of active cells are: "+count+" i.e. " + ((count / TotalCells) * 100).toFixed(2) + "%" + "<br>"

    percolatevar[0].innerHTML += "The number and percentage of water occupied cells are:"+watercells+" i.e. " + ((watercells / TotalCells) * 100).toFixed(2) + "%"

}
function random(){
    myFunction();
    reset();
    var dictRandom={};
    //arr=Array.from({length: 100}, () => ([0,0]))
    let multiplier=1000000000;
    for(var i=0;i<TotalCells;i++){
        var randomCellMap=Math.floor(Math.random()*multiplier);
        
        dictRandom[i]=randomCellMap;
    }
    
    var items = Object.keys(dictRandom).map(function(key) {
        return [ key,dictRandom[key]];
    });
    
    // Sort the array based on the second element
    items.sort(function(first, second) {
        if(second[1]!=first[1]){

            return second[1] - first[1];
        }
        else{
            return second[0]-first[0];
        }
    });
    
    // Create a new array with only the first 5 items
    

    for(var i=0;i<TotalCells;i++){
        var cell=items[i][0];
        DSU(cell);
 
        if(percolatesOrNot()){
            percolatevar[1].innerHTML = "System Percolates"
            updatestats();
            break;
        }
    }

}
// function reset ends here
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }
function DSU(i){
    i=parseInt(i)
    
    dict[i]=1;
    if(i+lengthOfTopRow<TotalCells && dict[i+lengthOfTopRow]==1){
        union(i, i + lengthOfTopRow);
    }
    
    if(i-lengthOfTopRow>=0 && dict[i-lengthOfTopRow]==1){
        union(i,i-lengthOfTopRow);        
    }

    if((i+1)%lengthOfTopRow!=0 && (i+1)<TotalCells && dict[i+1]==1){
        union(i,i+1);
    }

    if(i%lengthOfTopRow!=0 && i-1>=0 && dict[i-1]==1){
        union(i,i-1);
    }    
}

function myFunction(){
    var string="";
    var n=+document.getElementById("length").value;
    var repeater=`<div class="container"></div>`
    for( var i=0;i<n*n;i++){
        string+=repeater
    }
    for(var i=0;i<32;i++){
        string+="<br>";
    }
    
    
    
    document.getElementById("matrix").innerHTML=string;
    var widthofdevice=window.innerWidth
    var setMargin=n<=(3.8*widthofdevice/100);
 
    var margin=0
    if(setMargin){
        var margin=100/(50*n)
    }
    let division=(100/n-2*margin).toString();

    for(var i=0;i<n*n;i++){
        document.getElementsByClassName("container")[i].style.width=division+"%"
        document.getElementsByClassName("container")[i].style.height=division+"vh"
        document.getElementsByClassName("container")[i].style.margin=margin+"%";
    }

    var element = document.getElementsByClassName("container");
    TotalCells= element.length;
    lengthOfTopRow= Math.floor(Math.sqrt(TotalCells));
    // using percolatevar i have selected all the boxes in which the text changes
    percolatevar = document.getElementsByClassName("changetext");
    // dict maps all the element to one which have been clicked odd number of times and other to 0
    dict=[]

    // in visited i have stored all the egdes which have been visited during the dfs
    visited = []
    adj=[]
    // now i am making dictionary time complexity is order n
    for (var i = 0; i < TotalCells+2; i++) {
        dict.push(0);
    }


    rank= []
    parent=[]
}



