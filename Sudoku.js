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
    this.subRow = 3*this.row + Math.floor((pos%9)/3);
    this.subCol = 3*this.col + Math.floor((pos/9)/3);
}

//Array made of rows, colums or squares
function subStructure(sub){
   var subSud = []; //a sub sudokuStructure 
   var sud = []; //all subs build a sudoku structure
   var end = (sub == "subRow" || sub == "subCol")?27:9; //small structures need more space :D
   for(var i=0;i<end;i++){
       subSud = [];
       for(var j=0;j<81;j++){
	       if(sudoku[j][sub]==i){ // first [] is place, second one is bracket notation OOP
               subSud.push(j);
	       }
       }
       sud[i]=subSud;
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

function FindInRC(o){
	var sRow = subStructure("subRow")[o.subRow];
	var sCol = subStructure("subCol")[o.subCol];
	var length = 3;
	var array = [];
	for(var i=0;i<3;i++){
		if(typeof(sudoku[sRow[i]].value) != "object"){
			length--;
		}
		else{
			for(var sub in sudoku[sRow[i]].value){
				if(array.indexOf(sudoku[sRow[i]].value[sub]) == -1){
					array.push(sudoku[sRow[i]].value[sub]);
				}
			}
		}
	}
	if(array.length<=length){
		//del_RC("row",o);
		alert("test!"+ " "+o.col);
	}
}

function del_RC(sub,o){ //del_num for rows and col
	subName ="sub"+ sub[0].toUpperCase()+sub[1]+sub[2]; //the name of the small substructure
	var toDeleteSub = subStructure(sub)[o[sub]];
	var sSub = subStructure(subName)[o[subName]];
	$.each(sSub,function(index,value) { //just to test this function the other one would work aswell
   		toDeleteSub.splice(toDeleteSub.indexOf(value),1);
	});
	/*
	for(var i=0;i<3;i++){
		toDeleteSub.splice(toDeleteSub.indexOf(sSub[i]),1);
	}*/
	for(i=0;i<6;i++){
		if(typeof(sudoku[toDeleteSub[i]].value) == "object" && sudoku[toDeleteSub[i]].value.indexOf(o.value)!=-1){
			sudoku[toDeleteSub[i]].value.splice(sudoku[toDeleteSub[i]].value.indexOf(o.value),1);
		}
	}
}

function del_num(o){/*
	var toDeleteRow = subStructure("row")[o.row];
	var toDeleteCol = subStructure("col")[o.col];
	var sRow = subStructure("subRow")[o.subRow];
	var sCol = subStructure("subCol")[o.subCol];
	for(var i=0;i<3;i++){
		toDeleteRow.splice(toDeleteRow.indexOf(sRow[i]),1);
		toDeleteCol.splice(toDeleteCol.indexOf(sCol[i]),1);
	}
	for(i=0;i<6;i++){
		if(typeof(sudoku[toDeleteRow[i]].value) == "object" && sudoku[toDeleteRow[i]].value.indexOf(o.value)!=-1){
			sudoku[toDeleteRow[i]].value.splice(sudoku[toDeleteRow[i]].value.indexOf(o.value),1);
		}
		if(typeof(sudoku[toDeleteCol[i]].value) == "object" && sudoku[toDeleteCol[i]].value.indexOf(o.value)!=-1){
			for(i=0;i<6;i++){
		if(typeof(sudoku[toDeleteRow[i]].value) == "object" && sudoku[toDeleteRow[i]].value.indexOf(o.value)!=-1){
			sudoku[toDeleteRow[i]].value.splice(sudoku[toDeleteRow[i]].value.indexOf(o.value),1);
		}
		if(typeof(sudoku[toDeleteCol[i]].value) == "object" && sudoku[toDeleteCol[i]].value.indexOf(o.value)!=-1){
			sudoku[toDeleteCol[i]].value.splice(sudoku[toDeleteCol[i]].value.indexOf(o.value),1);
		}
	}	sudoku[toDeleteCol[i]].value.splice(sudoku[toDeleteCol[i]].value.indexOf(o.value),1);
		}
	}*/
	var subS = ["row","col"];
	for(var sub in subS){
		del_RC(subS[sub],o);
	}
    for(var i=o.square*3+Math.floor(o.square/3)*18;i<o.square*3+Math.floor(o.square/3)*18+3;i++){ //maybe conserve algorith but to be updated!
        for(var j =0; j <3 *9;j+=9){
            if(typeof(sudoku[i+j].value)=="object" && sudoku[i+j].value.indexOf(o.value)!=-1){
               sudoku[i+j].value.splice(sudoku[i+j].value.indexOf(o.value),1);        
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
            del_num(o);
	   		$('input[name='+toFix[i]+']').val(o.value);
		}
        else{
			//FindInRC(sudoku[toFix[i]]); //to be tested!!!
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
	    	//find_num();
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


//-----------------------------------End of Program!!-----------------------------------------------------------




//----------------------------------Not used features------------------------------------------------------------


//Modification to use indexOf inside arrays //not in use!
/*function index(toFind,array,first){
    for(var i=first;i<array.length;i++){
        if(typeof(array[i])=="object" && array[i].indexOf(toFind,first) != -1){
            return i;
        }
    }
    return array.indexOf(toFind,first);
}*/
