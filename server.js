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
<<<<<<< Updated upstream
console.log("discount amount array is",exactdiscountAmount([1,2,1,3,2],4));
=======
// console.log("discount amount array is",exactdiscountAmount([1,2,1,3,2],4));

const data = [ [1, 'apple',200], [2, 'banana',300], [1, 'orange',400], [2, 'grape',100], [3, 'melon',200] ];
/*
{
    1: ['apple', 'orange'],
    2: ['banana', 'grape'],
    3: ['melon']
}*/

let item = {};
data.forEach(([key, value,price]) => {
  if (!item[key]) {
    item[key] = [];
  }
  item[key].push(value);
});
// console.log(item)


const colors = ['red', 'blue', 'red', 'green', 'blue', 'blue'];
/*
{
    red: 2,
    blue: 3,
    green: 1
}*/

let color_with_count={};
colors.forEach((item)=>{
    if(!color_with_count[item]){
        color_with_count[item]=0;
    }
    color_with_count[item]++;
})
// console.log(color_with_count);

const nums = [1, 3, 2, 3, 4, 3, 2, 1, 1, 1];
/*
{
    number: 1,
    count: 4
}
*/

let number_with_count= {}
nums.forEach((item)=>{
    if(!number_with_count[item]){
        number_with_count[item]=0;
    }
    number_with_count[item]++;
})
console.log(number_with_count);

let maxCount=0;
let mostFrequest=null;
for(item in number_with_count){
   if(number_with_count[item]>maxCount){
       maxCount = number_with_count[item];
       mostFrequest =Number(item);
   }
}
// console.log(mostFrequest,maxCount);

const messyArray = [0, "apple", false, "", 42, null, "banana", undefined, NaN];
// ["apple", 42, "banana"]
let array=[]
messyArray.forEach(item=>{
    if(item){
        array.push(item);
    } 
})
// console.log(array) ;   

const nested = [1, [2, [3, [4, [[5]],8]]]];
function flattenArray(array){
    let result =[];
    array.forEach(item=>{
        console.log("Item",item);
        if(Array.isArray(item)){
            result = result.concat(flattenArray(item));
            console.log("Result ",result);   
        }
        else{
            console.log("Push thai item",item);
            result.push(item);
        }
    })
    return result;
}


// console.log("Flat array",nested.flat(Infinity));
// console.log("Flat array",flattenArray(nested));

const words = ['Apple', 'Banana', 'apple', 'ORANGE', 'banana', 'Orange'];
// ['Apple', 'Banana', 'ORANGE']

let word_count={}
let word_array=[];
words.forEach(item=>{
    let loew_item= item.toLowerCase();
    if(!word_count[loew_item]){
        word_count[loew_item]=true;
        word_array.push(loew_item)
    }
})
// console.log(word_array);

const anagram_words = ['listen', 'silent', 'enlist', 'rat', 'tar', 'art', 'hello'];
/*[
    ['listen', 'silent', 'enlist'],
    ['rat', 'tar', 'art'],
    ['hello']
]*/

let anagram_item={};

anagram_words.forEach(item=>{
    let new_item =item.split('').sort().join('');
    if(!anagram_item[new_item]){
        anagram_item[new_item]=[];
    }
    anagram_item[new_item].push(new_item);
})
// console.log(Object.values(anagram_item))


// Find two stirng is Anagram Or not : 
function string_anagram(str1,str2){
    let anagram_str1=str1.split('').sort().join('');
    let anagram_str2=str2.split('').sort().join('');
    if(anagram_str1 === anagram_str2){
        return true;
    }
    return false;
}
// console.log(string_anagram('hello','oellh'));

const str = "aabbcdeff";
//  "c"

function uniqueCharacter(str){
    let unique_character_item={};
    let str_array = str.split('');
    str_array.forEach(item=>{
        if(!unique_character_item[item]){
            unique_character_item[item]=0;
        }
        unique_character_item[item]=unique_character_item[item]+1;
    })
    for(let item in unique_character_item){
        if(unique_character_item[item]==1){
            return item;
        }
    }   
}
console.log(uniqueCharacter(str));

/*
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
*/

let number=[2,7,11,15];
let target=9
let array1=[];
for(let i=0;i<number.length-1;i++){
    
    for(let j=i+1;j<number.length;j++){
        if((number[i]+number[j])==target){
            array1.push(i);
            array1.push(j);
            break;
        }
    }
}
// console.log(array1)

/*
Input: nums = [0, 1, 0, 3, 12]
Output: [1, 3, 12, 0, 0]
*/

function moveZeros(array){
    let length = array.length;
    for(let i=0;i<length;i++){
     
        console.log("Elements",array[i])
        if(array[i]==0){
            array.splice(i,1);
            array.push(0);
            i--; 
            length--;
        }   
    }
    console.log(array);
}
moveZeros([0,1,0,0,3,12]);

function rotateArray(array,k){
    if(k>0){
        for(let i=0;i<k;i++){
           let item = array.pop();
           array.unshift(item);
           console.log("array",array);
        }
    }
    return array    
}
console.log(rotateArray([1,2,3,4,5],4));
>>>>>>> Stashed changes
