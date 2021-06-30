- Anyone should be able to enter their mobile number and initiate a chat with LEBOT.

- Build a database of 5 registered phone numbers with names.
  If the entered number is already registered,
  the welcome message should be "Welcome back to LEBOT, {Name}. How can I help you today?".
  If not, the welcome message should be- "Welcome to LEBOT. Please enter your name to continue."

- If the next message "looks like" {develop your own logic about this} a name,
  save it in DB. If it doesn't, throw an error saying- "Are you sure your name is- {Entered value}?
  Press 1 to confirm and 2 to re-enter."

- Next question by the bot: How can we help you today? 

- Depending upon the user's response in any language (except English), the bot
  identifies the language and asks- "Do you want to chat in {identified language}"?
  If the response is in English, the bot says, "Sure!".

# Task

0. **Bot**: (onAuth) - `Welcome back to LeBOT <Himujjal>`
    - go to `5`
1. **Bot**: (not auth) `Welcome to LeBOT. Please enter your mobile number`
    - User: `8723904266`
    - Proceed to `2`
2. **Bot**: `What would your good name be?`
    - `Himujjal`
    - Go to `3`
3. **Bot**: `Are you sure your name is ? Press 1 to confirm and Press 0 to re-enter`
    - `1` | `0`
    - If `0`, go to `4`
    - if `1`, Update the name. Register the user, get the token, and start your conversation. go to `5` 
    - If invalid go to `3`
4. `Re-enter your name` 
    - `Himujjal`
    - Go to `3`
5. `How can we help you today?`
    - `<Some random message>`
    - Identify the language and go to `6`
6. `Would you like to talk in language <english>?`
    - `<some random message>` 
    - Go to `7`
7. `Sure!`

