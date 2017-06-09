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


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        var urlCheck = 'urlOK';
        $.each(allFeeds, function(index, value){
            if(!value.url || value.url === ''){
                urlCheck = 'urlFail';
            }
        });

        it('- should all have url defined and url is not empty', function(){
            expect(urlCheck).toBe('urlOK');
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        var nameCheck = 'nameOK';
        $.each(allFeeds, function(index, value){
            if(!value.name || value.name === ''){
                nameCheck = 'nameFail';
            }
        });

        it('- should all have name defined and name is not empty', function(){
            expect(nameCheck).toBe('nameOK');
        });

    });


    /* Write a new test suite named "The menu" */
    describe('The menu', function(){

        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('- should be hidden by default', function(){
            expect(document.getElementsByClassName('menu-hidden')).toBeDefined();
        });


         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        it('- should toggle visibilty when clicked', function() {

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            setTimeout(function() {
                loadFeed(0, done);
            }, 1);
        });

        it('- should contain at least one entry in the feed container', function(done) {
            expect($('.entry-link').length).toBeGreaterThan(0);
            done();
        });
    });


    /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var firstFeed;
        var secondFeed;

        beforeEach(function(done) {
            setTimeout(function() {
                loadFeed(0, function(){
                    firstFeed = $('.feed a:first-child').text();
                });
                done();
            });
        }, 1);

        it('- should change content when new feed is loaded', function(done) {
            loadFeed(1, function(){
                secondFeed = $('.feed a:first-child').text();
                expect(firstFeed).not.toEqual(secondFeed);
                done();
            });
        });
    });
}());