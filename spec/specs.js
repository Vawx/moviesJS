
describe( 'Ticket', function() {
   it("creates a tick with title, outline, and image", function() {
      var newTicket = new Ticket( "Test Movie", "www.imagelink.com", "This movie is..." );
      expect( newTicket.title ).to.equal( "Test Movie" );
      expect( newTicket.image ).to.equal( "www.imagelink.com" );
      expect( newTicket.outline ).to.equal( "This movie is..." );
   });
});
