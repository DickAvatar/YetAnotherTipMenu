v1.0.0

<h1>Yet Another Tip Menu</h1>

YATM addresses several problems with most tip menu apps:

1. YATM will not spam your chat room. The YATM bot watches for messages in chat and will only post a new tip menu if a certain number of messages have been posted (the rate limit).

2. YATM gracefully handles mutliple items with the same price. If a member tips and there is more than one item available for that price the member will be sent a private notification asking them to tell the broadcaster what item they tipped for.

3. YATM allows broadcasters to define multiple menus (five in total) and then select amongst them during bot setup or at any time via chat commands.

4. Unobfuscated code with a clear open source (Apache 2.0) license.

The source code for this bot is also available from https://github.com/DickAvatar/YetAnotherTipMenu

<h1>Setup</h1>
The following options can be specified in the bot setup/launch page.

&bullet; <b>command</b><br/>The command members will enter to view the tip menu<br/>
&bullet; <b>separator</b><br/>The symbol to display between items in the tip menu.<br/>
&bullet; <b>delay</b><br/>The delay (in minutes) between tip menu displays.<br/>
&bullet; <b>rate limit</b><br/>The number of messages the must have been entered into chat between menu displays.  Set this to 0 (zero) to disable rate limiting.<br/>
&bullet; <b>verbose</b><br/>Be notified when users request the tip menu.<br/>
&bullet; <b>welcome</b><br/>Should users entering the room receive a notification about the tip menu being active.<br/>
&bullet; <b>order</b><br/>If the price should be displayed before or after the item description.<br/>
&bullet; <b>weight</b><br/>Font weight of the text of the tip menu.<br/>
&bullet; <b>color</b><br/>Font color of the tip menu.<br/>
&bullet; <b>background</b><br/>Background color of the tip menu.<br/>

The font and background colors <b>must</b> be valid HTML color codes. See https://html-color-codes.info for a list of valid color codes.

<h1>Menu Definitions</h1>
There are five possible menus that can be defined.  Each menu has a dropdown that can be used to enable/disable that menu.

Each menu can have a maximum of 15 items.  To define a menu item enter the desired price followed by a description.  For example:

<b>25 If you like me</b>

will define the menu item "If you like me" for 25 tokens.

It is possible to have more than one menu enabled and the items from all enabled menus will be combined into a single menu. Menu items are always sorted by price so there is no need to order items on the setup page.

Blank menu items are ignored as are empty menus.  For example, a broadcaster might define items 1, 3, 4, 6, and 7 in menu one and items 12, 13, 14, and 15 in menu four.

<h1>Commands</h1>

The broadcaster can change the set of enabled menus at any time with chat commands.

<h2>/tipmenu [1|2|3|4|5]]</h2>

Enables one, or more, new menus.  For example <i>"/tipmenu 1 3 5"</i> will disable the current menus and enable menus 1, 3, and 5.  Users will now see the new tip menu when they enter the /tipmenu command.

<h2>/tipmenu list</h2>

Lists all menus that have been defined.

<h2>/tipmenu [bar|kiss|heart|diamond|star|crown|bear|rose|fire]</h2>

Change the separator symbol used when displaying the tip menu in chat.  For example <i>"/tipmenu heart"</i> will change the tip menu separator symbol to a heart ❤️.

<h2>/tipmenu sep</h2>

List the available separator symbols.

<h2>/tipmenu before</h2>
<h2>/tipmenu after</h2>

Determines if the price appears before or after the item description in the tip menu.