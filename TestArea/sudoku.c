#include <iostream>

int main(){
	//feld
	void printField(int array){
		int i =0;
		string str = "|";
		printf("-------------------------");
		for(;i<81;i++){
			str+= array[i]+"|";
			if(i%9==0 && i!=0){
				printf(str);
				str = "";
			}
		}
		printf("-------------------------");
	}
}

