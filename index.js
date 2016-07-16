#!/usr/bin/env node

'use strict';

const customers = require("./data/customers.json");
const lodown = require("./node_modules/lowdown-carolineh");
/**
 * 1. Import your lodown module using the require() method
 * 2. Solve all problems as outlined in the README.
 */
 
// number of males
function numMales (arr) {
    return lodown.filter(arr, function (customer){ 
        return customer.gender === "male";
    }).length;
}

console.log(numMales(customers));

// number of females
function numFemales (arr) {
    return lodown.filter (arr, function (customer) {
        return customer.gender === "female";
    }).length;
}

console.log(numFemales(customers));

//oldest person
function oldest (arr) {
    return lodown.reduce (arr, function (cur, max) {
        if (cur.age < max.age) {
            return max;
        }else {
            return cur;
        }
    });
}
console.log(oldest(customers));

//youngest person
function youngest(arr) {
    return lodown.reduce (arr, function (cur, min) {
       if (cur.age > min.age) return min;
       else return cur;
    });
}
console.log (youngest(customers));

//average balance
function average(arr) {
    let balances = lodown.map(arr, function(customer) {
        var bal = customer.balance.slice(1);
        var bal2 = bal.replace(/,/g, "");
        var realBal = Number(bal2);
        return realBal;
    });
    return lodown.reduce (balances, function (sum, n) {
        return sum + n;
    })/ arr.length;
}
console.log(average(customers));

//same first letter of name
function sameLetter(arr, letter) {
   return lodown.filter (arr, function (customer) {
        return customer.name.charAt(0) == letter;
    }).length; 
}
console.log(sameLetter(customers,"A"));

// friend's names with same first letter
function friendsSameLetter (arr, letter) {
    let friends = lodown.map (arr, function (customer){
        return customer.friends;
    });
    var merged = [].concat.apply([], friends);
    return lodown.filter (merged, function (friend) {
        return friend.name.charAt(0) === letter;
    }).length;
}
console.log(friendsSameLetter(customers, "G"));

//customers are friends
function areFriends (arr) {
   let friends = lodown.map (arr, function (customer){
        return customer.friends;
    });
    var mergedFriends = [].concat.apply([], friends);
    let people = lodown.map(arr, function (customer) {
        return customer.name;
    });
    let test = lodown.map (mergedFriends, function(friend) {
        for (var i = 0; i < people.length; i++) {
            if (people[i] === friend.name) {
               return friend.name;
            }
        }
    });
    let results = lodown.partition (test, function(result) {
        return result !== undefined;
    });
    return results[0].length;
}
console.log(areFriends(customers));

//most common tag
function commonTags (arr) {
    let tags = lodown.map (arr, function (customer){
        return customer.tags;
    });
    var mergedTags = [].concat.apply([], tags);
    
    let count = lodown.reduce(mergedTags, function (tag, i, mergedTags) {
        if (typeof tag[i] == 'undefined') {
            tag[i] = 1;
        } else {
            tag[i] += 1;
        }
    return tag;
    }, {});
    var sortable = [];
        for (var tag in count)
              sortable.push([tag, count[tag]]);
        sortable.sort(
            function(a, b) {
                return a[1] - b[1];
            }
        );
    return lodown.last(sortable, 3);
}
console.log(commonTags(customers));

//count gender
function countByGender (arr) {
    let genders = lodown.map (arr, function (customer){
        return customer.gender;
    });
    return lodown.reduce(genders, function (gender, i, genders) {
        if (typeof gender[i] == 'undefined') {
            gender[i] = 1;
        } else {
            gender[i] += 1;
        }
    return gender;
    }, {});
}
console.log(countByGender(customers));