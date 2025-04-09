const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);

app.use(express.json());
const PORT = 3000;
const io = new Server(server, {
    cors: {
      origin: "*", 
      methods: ["GET", "POST"]
    }
});
require('./socket')(io);
server.listen(PORT,(error,result)=>{
    if(error){
        console.log("server is not connected",error);   
    }
    else{
        console.log("server is connected");
    }
})


function sumOfAllNaturalNumber(n){
    let sum=0;
    for(let i=1;i<=n;i++){
        sum +=i;
    }
    return sum;
}
// console.log(sumOfAllNaturalNumber(10));

function sumOfDigitOfNumber(number){
    let sum=0;
    let number1 =number;
    while(number1>0){   
        let rem = number1%10;3
        sum +=rem;
        number1 =Math.floor(number1/10);    
    }
    return sum;
}
// console.log(sumOfDigitOfNumber(1234));



function secondLargestNumber(number){
    if(number.length<2){
        return -1;
    }
    let largest_number =-Infinity;
    let second_largest = -Infinity;
    for(let i=0; i<number.length;i++){
        if(number[i]>largest_number){
            second_largest = largest_number;
            largest_number = number[i]; 
        }
        else if(number[i] > second_largest && number[i] != largest_number){
            second_largest = number[i];
        } 
    }
    return  (second_largest == -Infinity)? -1: second_largest;
}

function PairExist(numbers,sum){
    let flag1= false;
    for(let i=0;i<numbers.length;i++){
        let sum1=0;
     
        console.log(numbers.length);
           
        for(let j=i+1;j<numbers.length;j++){ 
            // console.log(a[j],a[i]);
            console.log(numbers[j],numbers[i]);
            
            sum1=numbers[j]+numbers[i]
            if(sum1 == sum)
            {
                flag1 = true
                return flag1
            }
        }
    }
    return flag1;
}
// console.log("saa",secondLargestNumber([10,20,30,30]));
// console.log("saa",secondLargestNumber([1,1,1,1,1]));
// console.log("saa",PairExist([1,2,3],2));
 

function bubbleSort(array){
    for(let i=0;i<array.length-1;i++){
        for(let j=0;j<array.length-2;j++){
            if(array[j]>array[j+1]){
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }    
    return array;
}
// console.log("Bubble sort ",bubbleSort([5,9,1,3,9,10]));

function selectionSort(array){
    for(let i=0;i<array.length-1;i++){
        let min=i;
        for(let j=i+1;j<array.length;j++){    
            if(array[min]>array[j]){
                min=j;
            }
        }
        let temp = array[i];
        array[i] = array[min];
        array[min] = temp;
        console.log(array);
    }
    return array;
}
// console.log("selection sort :",selectionSort([10,20,12,2,21]));


function quickSort(array){
    // console.log("New Araay:",array);
    if(array.length<=1){
        return array;
    }
    const pivot = array[array.length-1];
    let left=[];
    let right = [];
    for(let i=0;i<array.length-1;i++){
        if(array[i]<pivot){
            left.push(array[i]);
        }
        else{
            right.push(array[i]);
        }
    } 
    console.log(left,pivot,right);
    return [...quickSort(left),pivot,...quickSort(right)];
}
// console.log("Quick Sort :",quickSort( [7, 2, 1, 6, 8, 5, 3, 4]));

function exactdiscountAmount(array,target){
    let item=[];
    if(array.length<=1){
        return [];
    }

    for(let i=0;i<array.length-1;i++){
        for(let j=i;j<array.length-1;j++){
            console.log(j);
            
            if(array[i]+array[j]==target){
                item.push([array[i],array[j]]);
            }
        }
    }
    const uniqueArr = Array.from(
        new Set(item.map(JSON.stringify)),
        JSON.parse
    );
      
    return uniqueArr;
}
console.log("discount amount array is",exactdiscountAmount([1,2,1,3,2],4));