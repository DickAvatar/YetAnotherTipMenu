/*
 * Copyright 2019 Dick Avatar
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Change Log
 *
 * 1.0.0
 * - Initial release.
 */

const VERSION = '1.0.0-RC1'

// Symbols used as separators in the tip menu
const symbols = {
    bar: '|',
    kiss: '\u{1f48b}',
    heart: '\u2665',
    diamond: '\u2666',
    star: '\u2605',
    rose: '\u{1f339}',
    crown: '\u{1F451}',
    bear: '\u{1F43B}',
    fire: '\u{1F525}'
}

const broadcaster = cb.room_slug

// The number of messages posted to chat since the last time the tip
// menu was displayed.
let message_count = 0

// The variables that will be set from the cb.settings are defined here
// with default values incase there are problems processing the settings.
let command = "/tipmenu"
let delay = 60000
let rate_limit = 20
let background = '#FFFFFF'
let color = "#8B0000"
let weight = 'bold'
let verbose = true
let welcome = true

let separator = symbols.heart

cb.settings_choices  = [
    {name:'command', type:'str', defaultValue:'/tipmenu', label:'The command users can use to see the tip menu.'},
    {name:'separator', label:'Separator between menu items',type:'choice', choice1:'Bar', choice2:'Heart', choice3:'Diamond', choice4:'Star', choice5:'Rose', choice6:'Kiss', choice7:'Crown', choice8:'Fire', defaultValue:'Bar'},
    {name:'delay', type:'int', label:'How frequently to display the tip menu in chat (in minutes)', defaultValue:1},
    {name:'limit', type:'int', label:'How many messages must be entered before the tip menu will be display.  Set to 0 to disable rate limiting', minValue:0, defaultValue:'20'},
    {name:'verbose', type:'choice', label:'Do you want to be notified when users request to view the menu?', choice1:'yes', choice2:'no', defaultValue:'yes'},
    {name:'welcome', type:'choice', label:'Tell members about the tip menu when they enter?', type:'choice', choice1:'yes', choice2:'no', defaultValue:'yes'},
    {name:'weight', label: 'Font weight', type:'choice', choice1:'normal', choice2: 'bold', choice3: 'bolder', defaultValue:'bold'},
    {name:'color', type:'str', defaultValue:'#8B0000', label:'Tip menu font color. Must be a HTML color code.'},
    {name:'background', type:'str', defaultValue:'#FFFFFF', label:'Tip menu background color. See https://html-color-codes.info.'},
    {name:'menu0', type:'choice', choice1:'enable', choice2:'disable', defaultValue:'enable', label: 'Enable menu 1'},
    {name:'item00', type:'str', label:'Item 1', defaultValue:'10 Item 1'},
    {name:'item01', type:'str', label:'Item 2', defaultValue:'20 Item 2'},
    {name:'item02', type:'str', label:'Item 3', defaultValue:'30 Item 3'},
    {name:'item03', type:'str', label:'Item 4', defaultValue:'40 Item 4'},
    {name:'item04', type:'str', label:'Item 5', defaultValue:'50 Item 5'},
    {name:'item05', type:'str', label:'Item 6', defaultValue:'60 Item 6'},
    {name:'item06', type:'str', label:'Item 7', defaultValue:'70 Item 7'},
    {name:'item07', type:'str', label:'Item 8', defaultValue:'80 Item 8'},
    {name:'item08', type:'str', label:'Item 9', defaultValue:'90 Item 9'},
    {name:'item09', type:'str', label:'Item 10', defaultValue:'100 Item 10'},
    {name:'menu1', type:'choice', choice1:'enable', choice2:'disable', defaultValue:'disable', label: 'Enable menu 2'},
    {name:'item10', type:'str', label:'Item 1', defaultValue:'10 Item 1'},
    {name:'item11', type:'str', label:'Item 2', defaultValue:'20 Item 2'},
    {name:'item12', type:'str', label:'Item 3', defaultValue:'30 Item 3'},
    {name:'item13', type:'str', label:'Item 4', defaultValue:'40 Item 4'},
    {name:'item14', type:'str', label:'Item 5', defaultValue:'50 Item 5'},
    {name:'item15', type:'str', label:'Item 6', defaultValue:'60 Item 6'},
    {name:'item16', type:'str', label:'Item 7', defaultValue:'70 Item 7'},
    {name:'item17', type:'str', label:'Item 8', defaultValue:'80 Item 8'},
    {name:'item18', type:'str', label:'Item 9', defaultValue:'90 Item 9'},
    {name:'item19', type:'str', label:'Item 10', defaultValue:'100 Item 10'},
    {name:'menu2', type:'choice', choice1:'enable', choice2:'disable', defaultValue:'disable', label: 'Enable menu 3'},
    {name:'item20', type:'str', label:'Item 1', defaultValue:'10 Item 1'},
    {name:'item21', type:'str', label:'Item 2', defaultValue:'20 Item 2'},
    {name:'item22', type:'str', label:'Item 3', defaultValue:'30 Item 3'},
    {name:'item23', type:'str', label:'Item 4', defaultValue:'40 Item 4'},
    {name:'item24', type:'str', label:'Item 5', defaultValue:'50 Item 5'},
    {name:'item25', type:'str', label:'Item 6', defaultValue:'60 Item 6'},
    {name:'item26', type:'str', label:'Item 7', defaultValue:'70 Item 7'},
    {name:'item27', type:'str', label:'Item 8', defaultValue:'80 Item 8'},
    {name:'item28', type:'str', label:'Item 9', defaultValue:'90 Item 9'},
    {name:'item29', type:'str', label:'Item 10', defaultValue:'100 Item 10'},
    {name:'menu3', type:'choice', choice1:'enable', choice2:'disable', defaultValue:'disable', label: 'Enable menu 4'},
    {name:'item30', type:'str', label:'Item 1', defaultValue:'10 Item 1'},
    {name:'item31', type:'str', label:'Item 2', defaultValue:'20 Item 2'},
    {name:'item32', type:'str', label:'Item 3', defaultValue:'30 Item 3'},
    {name:'item33', type:'str', label:'Item 4', defaultValue:'40 Item 4'},
    {name:'item34', type:'str', label:'Item 5', defaultValue:'50 Item 5'},
    {name:'item35', type:'str', label:'Item 6', defaultValue:'60 Item 6'},
    {name:'item36', type:'str', label:'Item 7', defaultValue:'70 Item 7'},
    {name:'item37', type:'str', label:'Item 8', defaultValue:'80 Item 8'},
    {name:'item38', type:'str', label:'Item 9', defaultValue:'90 Item 9'},
    {name:'item39', type:'str', label:'Item 10', defaultValue:'100 Item 10'},
    {name:'menu4', type:'choice', choice1:'enable', choice2:'disable', defaultValue:'disable', label: 'Enable menu 5'},
    {name:'item40', type:'str', label:'Item 1', defaultValue:'10 Item 1'},
    {name:'item41', type:'str', label:'Item 2', defaultValue:'20 Item 2'},
    {name:'item42', type:'str', label:'Item 3', defaultValue:'30 Item 3'},
    {name:'item43', type:'str', label:'Item 4', defaultValue:'40 Item 4'},
    {name:'item44', type:'str', label:'Item 5', defaultValue:'50 Item 5'},
    {name:'item45', type:'str', label:'Item 6', defaultValue:'60 Item 6'},
    {name:'item46', type:'str', label:'Item 7', defaultValue:'70 Item 7'},
    {name:'item47', type:'str', label:'Item 8', defaultValue:'80 Item 8'},
    {name:'item48', type:'str', label:'Item 9', defaultValue:'90 Item 9'},
    {name:'item49', type:'str', label:'Item 10', defaultValue:'100 Item 10'}
];

const NUM_MENUS = 5
const ITEMS_PER_MENU = 10

/*
 * A menu item consists of a cost and a description.  The menu Item objects
 * are used to build the menu string that is displayed in chat.
 */
class Item {
    constructor(cost, description) {
        this.cost = cost
        this.description = description
    }

    toString() {
        return `(${this.cost}) ${this.description}`
    }
}

function compareItems(a,b) {
    return a.cost - b.cost
}

/*
 * The TipMenu class stores lists of strings (descriptions) using the price
 * as the key. This enables us to quickly look up all the items that are
 * available for a given price.
 */
class TipMenu {
    constructor() {
        this.menu = {}
        this.items = []
        this.ad = null
    }

    add(cost, description) {
        let list = this.menu[cost]
        if (list == null) {
            list = []
            this.menu[cost] = list
        }
        list.push(description)
        this.items.push(new Item(cost, description))
    }

    addMenu(menu) {
        menu.items.forEach( item => this.add(item.cost, item.description))
    }

    get(cost) {
        return this.menu[cost]
    }

    list() {
        if (this.ad == null) {
            this.items.sort(compareItems)
            this.ad = `${broadcaster}'s Tip Menu: ` + this.items.map(i => i.toString()).join(` ${separator} `)
        }
        return this.ad
    }

    size() {
        return this.items.length
    }
}

// Shorthand for cb.sendNotice with the parameters in the correct order ;-)
function notify(user, message) {
    cb.sendNotice(message, user)
}

/*
 * Sends the tip menu to a single user as a Notice.
 */
function displayMenu(to_user) {
    if (current == null) {
        cb.log('current menu is null')
        current = menus[0]
    }
    if (current == null) {
        cb.log('current menu is still null')
        return
    }
    cb.sendNotice(current.list(), to_user, background, color, weight)
}

/*
 * The function that is called periodically to display the tip menu.
 */
function scheduleDisplay() {
    // Schedule another display.
    cb.setTimeout(scheduleDisplay, delay)
    if (rate_limit > 0 && message_count < rate_limit) {
        // Do not spam chat if rate limiting is enabled and the message
        // count is too low.
        return
    }
    // Display the menu to the entire room and reset the count.
    displayMenu('')
    message_count = 0
}

// The currently selected menu.  Will be initialized once the setup page
// has been parsed.
let current = new TipMenu()

// The list of all available tip menus.
let menus = []


/*
 * Initialize the tip menus and other settings from the setup page.
 */
function init() {

    // Styles and other settings from the setup page.
    color = cb.settings.color
    background = cb.settings.background
    weight = cb.settings.weight
    rate_limit = parseInt(cb.settings.limit)
    verbose = cb.settings.verbose === 'yes'
    welcome = cb.settings.welcome === 'yes'
    command = cb.settings.command

    // The separator is the character to be displayed between items in the tip menu.
    separator = symbols[cb.settings.separator.toLowerCase()]
    if (separator == null) {
        notify(broadcaster, `PROGRAMMING ERROR: cb.settings.separator ${cb.settings.separator} is undefined. Please contact the developer.`)
        separator = symbols.Bar
    }

    // Build the TipMenus.
    for(let i = 0; i < NUM_MENUS; ++i) {
        cb.log("Builing menu " + i)
        let menu = new TipMenu()
        for (let j = 0; j < ITEMS_PER_MENU; ++j) {
            let s = cb.settings[`item${i}${j}`]
            if (s != null && s.length > 0) {
                let space = s.indexOf(' ')
                if (space === -1) {
                    notify(broadcaster, `Invalid tip menu ${i + 1} item #${j + 1}: ${s}`)
                }
                else {
                    let price = s.substring(0, space).trim()
                    let desc = s.substring(space + 1).trim()
                    cb.log(`Menu item ${i} ${j}: ${price} ${desc}`)
                    menu.add(price, desc)
                }
            }
        }
        if (menu.size() === 0) {
            cb.log('Empty menu found.')
            break
        }
        menus.push(menu)
        let key = 'menu' + i
        if (cb.settings[key] == 'enable') {
            cb.log(`Enabled menu ${i}`)
            current.addMenu(menu)
        }
        else {
            cb.log(`Menu ${i} is not enabled.`)
        }
    }

    /*
    for (let i = 0; i < NUM_ITEMS; ++i) {
        let s = cb.settings[`item${i}`]
        if (s == null) {
            cb.log(`No item defined for item ${i}`)
        }
        else if (s.startsWith('# ')) {
            let heading = s.substring(2)
            menu = new TipMenu(heading, sep)
            menus.push(menu)
        }
        else if (s.length > 1) {
            let space = s.indexOf(' ')
            if (space === -1) {
                notify(broadcaster, `Invalid tip menu item #${i + 1}: ${s}`)
            }
            else {
                let price = s.substring(0, space).trim()
                let desc = s.substring(space + 1).trim()
                menu.add(price, desc)
            }
        }
    }
    */

    // The delay determines how frequently the tip menu will be displayed.
    // The default is once per minute.
    let m = parseInt(cb.settings.delay)
    if (isNaN(m)) {
        notify(broadcaster, 'Invalid tip menu delay specified. Defaulting to one minute.')
        delay = 60000
    }
    else {
        delay = m * 60000
    }

    // Start the periodic menu display
    message_count = rate_limit
    scheduleDisplay()
}

// Watch for requests from user to display the tip menu
function onMessage(message) {
    let user = message.user
    let m = message.m
    if (user === broadcaster && m.startsWith(command)) {
        message['X-Spam'] = true
        // let args = m.substring(command.length + 1).trim().split(' ')
        let args = m.split(" ")
        args.shift()
        if (args.length === 0) {
            // The broadcaster just wants to see the tip menu.
            displayMenu(user)
            return
        }

        let sep = symbols[args[0]]
        if (sep != null) {
            // The broadcaster is changing the separators
            separator = sep
            current.ad = null
            notify(broadcaster, `Menu separator changed to ${separator}`)
            return
        }
        if (args[0] === 'separators') {

            let items = []
            let msg = 'Available menu separators:\n' + Object.keys(symbols).map( key => `${key}:${symbols[key]}`).join('\n')
            notify(broadcaster, msg)
            return
        }

        // Otherwise we assume the broadcaster is selecting new menus.
        let previous = current
        current = new TipMenu()
        while (args.length > 0) {
            let arg = args.shift()
            let n = parseInt(arg)
            if (isNaN(n)) {
                notify(broadcaster, 'Invalid menu number: ' + arg)
            }
            else if (n > 0 && n <= NUM_MENUS) {
                current.addMenu(menus[n-1])
            }
        }
        if (current.size() === 0) {
            notify(broadcaster, 'No valid menus selected.')
            current = previous
        }
    }
    else if (message['m'] === command) {
        // Hide the message from others in the room.
        message['X-Spam'] = true
        displayMenu(user)
        if (verbose) {
            // Notify the broadcaster
            notify(broadcaster, 'Sent the tip menu to ' + user)
        }
    }
    else {
        ++message_count
    }
    return message
}

function onTip(tip) {
    // Increment the counter to account to the tip message
    ++message_count

    // Look up the the tip amount to see if there are any items on the
    // menu for that price.
    let amount = tip.amount
    let items = current.get(amount)
    if (items == null) {
        // Not a tip amount we are interested in.
        return
    }

    // And increment again to account for our output.
    ++message_count

    // There is only one item at this price so print the message and leave.
    if (items.length === 1) {
        let msg = `${tip.from_user} tipped for ${items[0]}`
        notify('', msg)
        return
    }

    // There is more than one item available for this price. Display the
    // choices and ask the tipper to pick one.
    let choices = items.map(item => `"${item}"`).join(', ')
    notify('', `${tip.from_user} tipped for one of: ${choices}`)
    notify(tip.from_user, 'Please tell me which of the items you want.')
}

function onEnter(user) {
    if (welcome) {
        notify(user['user'], `My tip menu is active! Type ${command} to see what I have to offer.`)
    }
}

// Register our message handlers.
cb.onTip(onTip)
cb.onMessage(onMessage)
cb.onEnter(onEnter)

cb.setTimeout(init, 200)
