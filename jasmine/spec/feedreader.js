/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('- should have allFeeds defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('- should all have url defined and url is not empty', function() {
            allFeeds.forEach(function(feed) {
            expect(feed.url).toBeDefined();
            expect(feed.url).not.toBe('');
            });
        });

        /* Loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('- should all have name defined and name is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });

    });


    describe('The menu', function(){

        /* Ensures the menu element is
        * hidden by default. 
        */

        it('- should be hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toBeDefined();
        });

         /* Ensures that the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        it('- should toggle visibilty when clicked', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    describe('Initial Entries', function(){

        /* Ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
                loadFeed(0, done);
        });

        it('- should contain at least one entry in the feed container', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });


    describe('New Feed Selection', function(){
        /* Ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Again, loadFeed() is asynchronous.
         */

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('- should change content when new feed is loaded', function(done) {
            var firstFeed = $('.feed').html();
            loadFeed(1, function(){
                var secondFeed = $('.feed').html();
                expect(firstFeed).not.toEqual(secondFeed);
                done();
            });
        });
    });
}());