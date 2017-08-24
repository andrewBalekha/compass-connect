const { expect } = require('chai');
const Connection = require('../../../lib/models/connection');

describe('Connection', () => {
  context('when saving secure fields', () => {
    it('successfully requires keytar', () => {
      expect(require('keytar')).to.have.property('addPassword');
    });
  });

  describe('#new', () => {
    const date = new Date();
    const connection = new Connection({
      last_used: date
    });

    it('adds an _id field to the model', () => {
      expect(connection._id).to.not.equal(null);
    });

    it('adds a last_used field to the model', () => {
      expect(connection.last_used).to.deep.equal(date);
    });

    it('adds an is_favorite field to the model', () => {
      expect(connection.is_favorite).to.equal(false);
    });
  });

  describe('#username', () => {
    context('when there is no auth', () => {
      const connection = new Connection();

      it('returns an empty string', () => {
        expect(connection.username).to.equal('');
      });
    });

    context('when auth is MONGODB', () => {
      const connection = new Connection({
        authentication: 'MONGODB',
        mongodb_username: 'testing'
      });

      it('returns the mongodb_username', () => {
        expect(connection.username).to.equal('testing');
      });
    });

    context('when auth is KERBEROS', () => {
      const connection = new Connection({
        authentication: 'KERBEROS',
        kerberos_principal: 'testing'
      });

      it('returns the kerberos_principal', () => {
        expect(connection.username).to.equal('testing');
      });
    });

    context('when auth is X509', () => {
      const connection = new Connection({
        authentication: 'X509',
        x509_username: 'testing'
      });

      it('returns the x509_username', () => {
        expect(connection.username).to.equal('testing');
      });
    });

    context('when auth is LDAP', () => {
      const connection = new Connection({
        authentication: 'LDAP',
        ldap_username: 'testing'
      });

      it('returns the ldap_username', () => {
        expect(connection.username).to.equal('testing');
      });
    });
  });
});
