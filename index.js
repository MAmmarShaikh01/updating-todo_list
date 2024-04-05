#! /usr/bin/env node
import inquirer from "inquirer";
//@ts-ignore
let todos = [];
let condition = true;
while (condition) {
    let todo = await inquirer.prompt([
        {
            name: "item",
            message: "what do you want to add in your todos",
            type: "input"
        }
    ]);
    let loop = true;
    let ans;
    while (todo.item == "" && loop) {
        let todo = await inquirer.prompt([
            {
                name: "item",
                message: "what do you want to add in your todos",
                type: "input"
            }
        ]);
        if (todo.item != "") {
            loop = false;
            ans = todo.item;
        }
    }
    if (todo.item != "") {
        todos.push(todo.item);
        console.log(todos);
    }
    else {
        todos.push(ans);
    }
    //! confirmation
    let confirmation = await inquirer.prompt({
        name: "confirmationItem",
        message: "select one option",
        type: "list",
        choices: ["continue", "edit", "delete", "exit"]
    });
    if (confirmation.confirmationItem == "edit") {
        //@ts-ignore
        let val = [];
        //@ts-ignore
        todos.map((a, b) => val.push(b + 1));
        let edditing = await inquirer.prompt([
            {
                name: "edittingItem",
                message: "which element you want to edit",
                type: "list",
                //@ts-ignore
                choices: val
            },
            {
                name: "changes",
                message: "what do you want to replace it with ?",
                type: "input"
            }
        ]);
        //@ts-ignore
        todos[edditing.edittingItem - 1] = edditing.changes;
        console.log(todos);
    }
    else if (confirmation.confirmationItem == "delete") {
        //@ts-ignore
        let val = [];
        //@ts-ignore
        todos.map((a, b) => val.push(b + 1));
        let deletion = await inquirer.prompt([
            {
                name: "deletionProcess",
                message: "which element do you want to delete",
                type: "list",
                //@ts-ignore
                choices: val
            }
        ]);
        todos.splice(deletion.deletionProcess - 1, 1);
        console.log(todos);
    }
    else if (confirmation.confirmationItem == "exit") {
        condition = false;
        console.log(todos);
    }
    else if (confirmation.confirmationItem == "continue") {
        condition = true;
        console.log(todos);
    }
}
