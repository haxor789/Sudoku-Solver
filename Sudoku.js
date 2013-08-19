$(document).ready(function(){

//---------------------------field--------------------------------------------------
// Works good, but the static html is better for testing the Solve functions
/*$("body").prepend("<table></table>");	
for(var i=0;i<9;i++){
   var s = "";
   var c = "";
   var point =0;
   $("table").append('<tr id="tr'+i+'"></tr>');
   for(var j =0;j<9;j++){
	c="normal"
	point = 9*i+j;
	if((i+1)%3===0 && (i+1)%9!==0){
		c+=" bottom";
	}
	if((point+1)%3===0 && (point+1)%9!==0){
		c+=" right";
	}
	s+='<td class="'+c+'" ><input id="'+point+'" name="'+point+'" type="text" maxlength="1"/></td>\n';
	//alert(s);	
   }
   $("#tr"+i+"").html(s);
}*/
//-------------------------------------------------------------------------------------------


function numbers(pos){
    this.row =Math.floor(pos/9);
    this.col=pos%9;
    this.square=Math.ceil((this.col+1)/3)+Math.floor((this.row)/3)*3 - 1; 
    this.value = [1,2,3,4,5,6,7,8,9];
}
//Modification to use indexOf inside arrays //not in use!
function index(toFind,array,first){
    for(var i=first;i<array.length;i++){
        if(typeof(array[i])=="object" && array[i].indexOf(toFind,first) != -1){
            return i;
        }
    }
    return array.indexOf(toFind,first);
}

//Array made of rows, colums or squares
function subStructure(sub){
   var subSud = []; //a sub sudokuStructure 
   var sud = []; //all subs build a sudoku structure
   for(var i=0;i<9;i++){
       subSud = [];
       for(var j=0;j<81;j++){
	       if(sudoku[j][sub]==i){
               subSud.push(j);
	       }
       }
       sud[i]=subSud;
   }
   return sud;
}

function RCSub(sub){
	var bSub = subStructure(sub); // big substructure
	var sSub = [];  //small substructure
	var sud = []
    for(var i=0;i<9;i++){
        sSub =[];
		for(var j=0;j<9;j++){
            if(j%3===0 && j!==0){
                 sud.push(sSub);
                 sSub =[];
            }
            sud.push(bSub[i][j]);
		}        
	}
	return sud;	
}

sudoku = [];
toFix = [];

function set(){
    for(var i=0;i<81;i++){
        sudoku[i]= new numbers(i);
        toFix[i]=i;
        if($('input[name='+i+']').val()!==''){
            sudoku[i].value=$('input[name='+i+']').val();
	    $('#'+i+'').addClass("start");
        }
    }
}

function find_num(){
    alert("find");
    var count=0;
    var point=81;
    var subStruc = ["row", "col", "square"];
    var number = 0;
    for(key in subStruc){//working but to be improved! 
        var sub = subStructure(subStruc[key]);
        for(var i=1;i<10;i++){
	    for(var j=0;j<9;j++){
	        for(var k=0;k<9;k++){
		    if(typeof(sudoku[sub[j][k]].value)=="number" && sudoku[sub[j][k]].value==i){
		        break;
		    }
		    if(typeof(sudoku[sub[j][k]].value) != "number" && sudoku[sub[j][k]].value.indexOf(i)!=-1){
		        count++;
			point=sub[j][k];
		    }
		    if(k==8){//alert(i+" "+j+" "+k);//alert(count+" "+subStruc[key]+" "+i);
		        if(count ==1){
			    $('input[name='+point+']').val(i);
			    sudoku[point].value = $('input[name='+point+']').val();
		        }
		        count =0;
		        point=81;
		    }
		}
	    }
	}
    }
}

function del_num(row,col,sq,value){
    for( var i=row*9;i<(row+1)*9;i++){
        if(typeof(sudoku[i].value)=="object" && sudoku[i].value.indexOf(value)!=-1){
            sudoku[i].value.splice(sudoku[i].value.indexOf(value),1);        
        }
    }
    for(i=col;i<81;i+=9){
        if(typeof(sudoku[i].value)=="object" && sudoku[i].value.indexOf(value)!=-1){
            sudoku[i].value.splice(sudoku[i].value.indexOf(value),1);        
        }
    }
    for(i=sq*3+Math.floor(sq/3)*18;i<sq*3+Math.floor(sq/3)*18+3;i++){
        for(var j =0; j <3 *9;j+=9){
            if(typeof(sudoku[i+j].value)=="object" && sudoku[i+j].value.indexOf(value)!=-1){
               sudoku[i+j].value.splice(sudoku[i+j].value.indexOf(value),1);        
            }
        }
    }
}



function seekAndDestroy(){   
    alert('s&d2');
    var nToFix = [];
    c=0;
    for(var i =0;i<toFix.length;i++){
        if(sudoku[toFix[i]].value.length == 1){
            var o = sudoku[toFix[i]]; 
            o.value = Number(o.value[0]);
            //o.fixed = true;
            del_num(o.row,o.col,o.square,o.value);
	    $('input[name='+toFix[i]+']').val(o.value);
	}
        else{
            nToFix[c]=toFix[i];
            c++;
        }
    } 
    toFix = nToFix;
    alert("s&d4");
}

    function solve(){
        var i =0;
        alert('s&d1');
	while(toFix.length>0 && i<10){
            seekAndDestroy();
	    find_num();
            i++;            
        }
        alert('s&d3');
    }

//************************** Button's and Checkboxes ******************************************************

    //Show me the value of field x
    $("input").click(function(){
	var id = (this.id); 
	//additional info: .is(:checked) is dynamic .attr(checked) gives static value from html document
	if($("#cbox").is(":checked"))
	alert(sudoku[id].value);
    });

    $('#set').click(function(){
         set();
	 alert("set");
    });

    $('#solve').click(function(){
        solve();
    });
});
