
// using element i have selected all the above boxes
var element = document.getElementsByClassName("container");
var TotalCells= element.length;
var lengthOfTopRow= Math.floor(Math.sqrt(TotalCells));
// using percolatevar i have selected all the boxes in which the text changes
var percolatevar = document.getElementsByClassName("changetext");
// dict maps all the element to one which have been clicked odd number of times and other to 0
var dict = {}

// in visited i have stored all the egdes which have been visited during the dfs
var visited = {}
var adj={}
// now i am making dictionary time complexity is order n
for (var i = -2; i < TotalCells; i++) {
    dict[i] = 0;
}


var rank= {}
var parent={}


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
    for (var i = -2; i < TotalCells; i++) {
        rank[i]=1;
        parent[i]=i;
    }
    for(var i=0;i<lengthOfTopRow;i++){
        union(-1,i);
    }
    for(var i=TotalCells-lengthOfTopRow;i<TotalCells;i++){
        union(-2,i);
    }
}
function percolatesOrNot(){
    return find(-2)==find(-1);
}
function reset() {
    console.log("reset")
    for (var i = -2; i < TotalCells; i++) {
        dict[i] = 0;
        visited[i] = 0;
        adj[i]=new Set();        
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
        adj[v].add(u);
        adj[u].add(v);
    }
    function addUniDirectEdge(u, v) {
        adj[u].add(v);
    }
    for (var i = 0; i < lengthOfTopRow; i++) {
        addedge(i, -1);
    }
    for (var i = TotalCells - lengthOfTopRow; i < TotalCells; i++) {
        addUniDirectEdge(i, -2);
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
    dfs(-1);

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
    
    // console.log(items.slice(0, 100));
    for(var i=0;i<TotalCells;i++){
        var cell=items[i][0];
        DSU(cell);
        console.log(cell);
        if(percolatesOrNot()){
            percolatevar[1].innerHTML = "System Percolates"
            updatestats();
            break;
        }
    }

}
// function reset ends here

function DSU(i){
    i=parseInt(i)

    dict[i]=1;
    if(dict[i+lengthOfTopRow]==1){
        union(i, i + lengthOfTopRow);
    }
    
    if(dict[i-lengthOfTopRow]==1){
        union(i,i-lengthOfTopRow);        
    }

    if((i+1)%lengthOfTopRow!=0 && dict[i+1]==1){
        union(i,i+1);
    }

    if(i%lengthOfTopRow!=0 && dict[i-1]==1){
        union(i,i-1);
    }    
}





