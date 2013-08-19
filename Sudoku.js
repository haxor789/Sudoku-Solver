$(document).ready(function(){

function numbers(pos){
    this.row =Math.floor(pos/9);
    this.col=pos%9;
    this.square=Math.ceil((this.col+1)/3)+Math.floor((this.row)/3)*3 - 1; 
    this.value = [1,2,3,4,5,6,7,8,9];
}

sudoku = [];
toFix = [];

function set(){
    //$('#0').val(1);
  for(var i=0;i<81;i++){
     sudoku[i]= new numbers(i);
     toFix[i]=i;
     if($('input[name='+i+']').val()!==''){
        sudoku[i].value=$('input[name='+i+']').val();
	$('#'+i+'').addClass("start");
        //alert(i);
     }
   }
   /*var t1 = 0;
   var test = $('input[name='+t1+']').val();
   var test2 = $('input[name=1]').val();
   alert(test);
   alert(test==="");
   alert(test2);
   alert(test2==="");
   alert(sudoku[1].value);
   alert(sudoku[2].value);*/

}

function find_num(){
   alert("find");
   var count;
   var point;
   for(l=1;l<10;l++){
   	for(k=0;k<9;k++){ 
		count=0;
		point=81;
   		for( var i=k*9;i<(k+1)*9;i++){
			if(sudoku[i].value==l){
				break;
			}
			if(typeof(sudoku[i].value) != "number" && sudoku[i].value.indexOf(l)!=-1){
				count++;
				point=i;
				//alert(count+" "+point+" "+l);
			}
			if(i==(k+1)*9-1){
				if(count ==1){
				     $('input[name='+point+']').val(l);
				     sudoku[point].value = Number($('input[name='+point+']').val());
				     alert(sudoku[point].value);
				     //alert(typeof(sudoku[point].value));
				     //alert("row "+point);
				}
					count =0;
					point=81;
			}
    		} 
    		for(var i=k;i<81;i+=9){
			if(sudoku[i].value==l){
				break;
			}
			if(typeof(sudoku[i].value) != "number" && sudoku[i].value.indexOf(l)!=-1){
				count++;
				point=i;
			}
			if(i==8*9+k){
				if(count ==1){
				     $('input[name='+point+']').val(l);
				     sudoku[point].value = Number($('input[name='+point+']').val());
				     alert("col "+point);
				}
				count =0;
				point=81;
			}
    		}
    		for(i=k*3+Math.floor(k/3)*18;i<k*3+Math.floor(k/3)*18+3;i++){
        		var br = false;
			for(var j =0; j <3 *9;j+=9){
				if(sudoku[i+j].value==l){
					br=true;
					break;
				}
				if(typeof(sudoku[i+j].value) != "number" && sudoku[i+j].value.indexOf(l)!=-1){
					count++;
					point=i+j;
				}
				var sum = i+j;
				if(i+j==(k*3+Math.floor(k/3)*18+3-1+18)){
					if(count ==1){					    
				    	    $('input[name='+point+']').val(l);
					    sudoku[point].value = Number($('input[name='+point+']').val());
					    alert("sq "+point);
					}
					count =0;
					point=81;
				}
        		}
			if(br){
				break;
			}
    		}
		
   	}
   }
}

function del_num(row,col,sq,value){
    for( var i=row*9;i<(row+1)*9;i++){
        //console.log(i);
        if(typeof(sudoku[i].value)=="object" && sudoku[i].value.indexOf(value)!=-1){
            sudoku[i].value.splice(sudoku[i].value.indexOf(value),1);        
        }
    }
    //console.log('\n');
    for(i=col;i<81;i+=9){
        //console.log(i);
        if(typeof(sudoku[i].value)=="object" && sudoku[i].value.indexOf(value)!=-1){
            sudoku[i].value.splice(sudoku[i].value.indexOf(value),1);        
        }
    }
    //console.log('\n');
    for(i=sq*3+Math.floor(sq/3)*18;i<sq*3+Math.floor(sq/3)*18+3;i++){
        for(var j =0; j <3 *9;j+=9){
            //console.log(i+ ' ' +j+ ' '+(i+j));
            if(typeof(sudoku[i+j].value)=="object" && sudoku[i+j].value.indexOf(value)!=-1){
               sudoku[i+j].value.splice(sudoku[i+j].value.indexOf(value),1);        
            }
        }
    }
}

function seekAndDestroy(){   
    alert('s&d2');
    nToFix = [];
    c=0;
	   //alert(toFix);
    for(var i =0;i<toFix.length;i++){
	//alert(sudoku[toFix[i]].value + "		"+i);
        if(/*typeof(sudoku[toFix[i]].value)=="number" ||*/ sudoku[toFix[i]].value.length == 1){
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
        //var i =0;
        alert('s&d1');/*
        while(toFix.length>0 && i<10){*/
            seekAndDestroy();
	    find_num();
            /*i++;            
        }*/
        alert('s&d3');
    }

    $('#set').click(function(){
         set();
	 find_num();
	 alert("set");
    });

    $('#solve').click(function(){
        solve();
    });
});



