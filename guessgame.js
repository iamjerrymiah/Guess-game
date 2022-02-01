var previouslyClickedID = "";
const alphabet=["A", "B", "C", "D"];
var cellPieces= [
                    [["13" ],["1"],["6"],["10"]],
                    [["12"],["4"],["8"],["5"]],
                    [["14"],["2"],["7"],["3"]],
                    [["9"],["11"],["15"],[""]]
                ];

const guessGameApp=()=>
{
   var headSection=document.createElement("header");
   headSection.appendChild(document.createElement("div"));
   headSection.querySelector("div").innerHTML="<strong><i>::PUZZLE GAME::</strong></i>";
   headSection.style="text-align: center;"

    
//    console.log(cellPieces[3][2]);

   var gameBoard=document.createElement("div");
   gameBoard.setAttribute("id", "gameBoard");

   var gameArea=document.querySelector("body");
   gameArea.appendChild(headSection);
   gameArea.appendChild(gameBoard);

   for(cellRow=0; cellRow<4; ++cellRow){
        for(cellCol=1; cellCol<=4; ++cellCol){
            var cellID=alphabet[cellRow]+cellCol;
            var aCell=document.createElement("div");
            aCell.setAttribute("id", cellID);
            aCell.style="float:left; border: 1px solid black; margin:0px;";
            aCell.classList.add("cell-dimen", "bg-dimen");
            aCell.textContent=(cellPieces[cellRow][cellCol-1])[0];
            aCell.addEventListener('click',   handleCellClick);
           

           gameBoard.appendChild(aCell);
        }
        gameBoard.appendChild(document.createElement("br"));
   }
}

const handleCellClick = ({target}) => {
    // console.log(target);
    if (!previouslyClickedID){
        if (document.querySelector('#' + target.id).textContent == '') return;
        previouslyClickedID = target.id;
        document.querySelector('#' + target.id).classList.add('selected-cell');
    }else if (previouslyClickedID == target.id){
        previouslyClickedID = "";
        document.querySelector('#' + target.id).classList.remove('selected-cell');
    }else if (previouslyClickedID && previouslyClickedID != target.id){
        // alert("Is valid move? " + (!isValidMove(previouslyClickedID, target.id) ? "False" : "True"));
        if (isValidMove(previouslyClickedID, target.id)){
            document.querySelector('#' + target.id).innerHTML = document.querySelector('#' + previouslyClickedID).innerHTML;
            document.querySelector('#' + previouslyClickedID).innerHTML = '';
            document.querySelector('#' + previouslyClickedID).classList.remove('selected-cell');
            previouslyClickedID = '';
            // TEST IF ALL PIECES ARE CORRECTLY SET.
        }
    }
    // alert(previouslyClickedID);
};

const isValidMove = (prevCellID, currentCellID) => {
    const prevCell_Row = prevCellID.charAt(0);
    const prevCell_Col = parseInt(prevCellID.charAt(1));
    const currCell_Row = currentCellID.charAt(0);
    const currCell_Col = parseInt(currentCellID.charAt(1));
    
    if (document.querySelector('#' + currentCellID).textContent != "") return false;

    // Check if ID by left-side of prevCellID is d currentCellID.
    if (prevCell_Col-1 >= 1){
        var leftCellID = prevCell_Row + (prevCell_Col - 1);
        if (document.querySelector('#' + leftCellID).textContent == ""){
            if (leftCellID == currentCellID) return true;
        }
    }
    // Check if ID by right-side of prevCellID is d currentCellID.
    if (prevCell_Col+1 <= 4){
        var rightCellID = prevCell_Row + (prevCell_Col + 1);
        if (document.querySelector('#' + rightCellID).textContent == ""){
            if (rightCellID == currentCellID) return true;
        }
    }
    // Check if ID by top-row of prevCellID is d currentCellID.
    if (alphabet.indexOf(prevCell_Row) > 0){
        var topCellID = alphabet[alphabet.indexOf(prevCell_Row)-1] + prevCell_Col;
        if (document.querySelector('#' + topCellID).textContent == ""){
            if (topCellID == currentCellID) return true;
        }
    }
    // Check if ID by bottom-row of prevCellID is d currentCellID.
    if (alphabet.indexOf(prevCell_Row) < alphabet.length-1){
        var downCellID = alphabet[alphabet.indexOf(prevCell_Row)+1] + prevCell_Col;
        if (document.querySelector('#' + downCellID).textContent == ""){
            if (downCellID == currentCellID) return true;
        }
    }
    return false;
};

window.onload=()=>{guessGameApp();};
/*
const initialiseGuessGame=()=>
{
    var headingDiv=document.createElement("header");
    headingDiv.appendChild(document.createElement("div"));
    headingDiv.querySelector("div").innerHTML="<h2>:: PUZZLE GAME ::</h2>";

    var gamingBo=document.createElement("div");
    gamingBo.setAttribute("id", "gameBoard");

    var gameSpace=document.querySelector("body");
    gameSpace.appendChild(heading);
    gameSpace.appendChild(gamingBo);

}
window.onload=()=>{initialiseGuessGame();};
*/
