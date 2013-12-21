p4.michaeljuhasz.biz
====================

The application I've built is quite similar (at least superficially) to what I turned in for project 3; i.e. a program to make, store and view bi-lingual flash cards.  Under the hood, there's been a near complete overhaul, as the js only version was using localStorage to save cards for each browser, whereas, in this version, cards are stored in a communal database and accessed according to the id of the signed-in user.  

As in the previous version, there are two methods to interact with the program: either by using the mouse to press the arrow buttons to cycle through the cards and to flip the card, by clicking on it, or by using the keys (left and right cycle through the cards, up and down flip the card).  

In addition to the restructuring of the data storage, I added a few new features.  You can now search for a word in your stack of cards, you can assign cards to a particular unit, and you can then pick which units you wish to view.  

To reiterate in a condensed manner, the features my project displays include:
- multi-user sign up and sign in
- database interaction (inserts and queries) facilitated by...
- ajax calls which dynamically pass, recieve and format data going to and from PHP
- javascript form validation
- all sorts of js buttons, which start animations, alter html and interact with the underlying array of js objects.

The application is totally usable by anyone who wants to take two seconds to sign up; however, it comes loaded with only one test flash card.  If you don't feel like adding cards of your own (and actually, there's no requirement that you use any Farsi; you could actually use any language you'd like, particularly since the keyboard plugin has a huge number of language options), you can log in with the email address: michael.juhasz@gmail.com and the password: Michael

