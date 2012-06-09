// Generated by CoffeeScript 1.3.1
(function() {

  describe('Basic test', function() {
    return it('true is true', function() {
      return expect(true).toBe(true);
    });
  });

  describe('Validation', function() {
    beforeEach(function() {
      return this.success = function() {
        return expect(this.v.errors_array().length).toBe(0);
      };
    });
    it('can be created', function() {
      var v;
      v = new JSValid.Validation();
      return expect(v.validate).toBeDefined();
    });
    describe('rule', function() {
      beforeEach(function() {
        return this.v = new JSValid.Validation();
      });
      it('name is required', function() {
        var value, _i, _len, _ref;
        this.v.validate('name', 'required');
        _ref = [null, ''];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          value = _ref[_i];
          this.v.isValid({
            name: value
          });
          expect(this.v.errors_array()).toContain('name is required');
        }
        this.v.isValid({
          name: 'testing'
        });
        return this.success();
      });
      it('email is a valid email address', function() {
        var value, _i, _len, _ref;
        this.v.validate('email', 'email');
        _ref = ['a@', 'a@a', '@a.com', 'foo@nice'];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          value = _ref[_i];
          this.v.isValid({
            email: value
          });
          expect(this.v.errors_array()).toContain('email is invalid');
        }
        this.v.isValid({
          email: 'foo@foo.com'
        });
        return this.success();
      });
      it('name has a minimum length', function() {
        var value, _i, _len, _ref;
        this.v.validate('name', {
          'min_length': 4
        });
        _ref = ['', 'a', 'ab', 'abc'];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          value = _ref[_i];
          this.v.isValid({
            name: value
          });
          expect(this.v.errors_array()).toContain('name is too short. It must be atleast 4 characters long');
        }
        this.v.isValid({
          name: 'appl'
        });
        return this.success();
      });
      it('name has a maximum length', function() {
        var value, _i, _len, _ref;
        this.v.validate('name', {
          'max_length': 4
        });
        _ref = ['abcde', 'abcdef', '9284912'];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          value = _ref[_i];
          this.v.isValid({
            name: value
          });
          expect(this.v.errors_array()).toContain('name is too long. It can be atmost 4 characters long');
        }
        this.v.isValid({
          name: 'appl'
        });
        return this.success();
      });
      it('status must be active, suspended, or deleted', function() {
        var value, _i, _len, _ref;
        this.v.validate('status', {
          'in': ['active', 'suspended', 'deleted']
        });
        _ref = [null, '', 'apple', 'test', 123];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          value = _ref[_i];
          this.v.isValid({
            status: value
          });
          expect(this.v.errors_array()).toContain('status must be (active,suspended,deleted)');
        }
        this.v.isValid({
          status: 'active'
        });
        return this.success();
      });
      it('status cannot be active or deleted', function() {
        var value, _i, _len, _ref;
        this.v.validate('status', {
          'ex': ['active', 'deleted']
        });
        _ref = ['active', 'deleted'];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          value = _ref[_i];
          this.v.isValid({
            status: value
          });
          expect(this.v.errors_array()).toContain('status cannot be (active,deleted)');
        }
        this.v.isValid({
          status: 'suspended'
        });
        return this.success();
      });
      return it('validates format', function() {
        var value, _i, _len, _ref;
        this.v.validate('cost', {
          'format': /^[0-9]+$/
        });
        _ref = [null, '', 'apple', 'a0', '2a', '1a1'];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          value = _ref[_i];
          this.v.isValid({
            cost: value
          });
          expect(this.v.errors_array()).toContain("cost doesn't match format");
        }
        this.v.isValid({
          cost: 12
        });
        this.success();
        this.v.isValid({
          cost: '12'
        });
        return this.success();
      });
    });
    return describe('complex rules', function() {
      beforeEach(function() {
        return this.v = new JSValid.Validation();
      });
      it('email is required and valid', function() {
        var value, _i, _j, _len, _len1, _ref, _ref1, _results;
        this.v.validate('email', 'email', 'required');
        _ref = [null, ''];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          value = _ref[_i];
          this.v.isValid({
            email: value
          });
          expect(this.v.errors_array()).toContain('email is required');
          expect(this.v.errors_array().length).toBe(1);
        }
        _ref1 = ['e@', 'e@e', 'e@e.c', '@foo.com'];
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          value = _ref1[_j];
          this.v.isValid({
            email: value
          });
          expect(this.v.errors_array()).toContain('email is invalid');
          _results.push(expect(this.v.errors_array().length).toBe(1));
        }
        return _results;
      });
      return it('name must be between 4 to 8 characters long', function() {
        var value, _i, _j, _len, _len1, _ref, _ref1, _results;
        this.v.validate('name', {
          'min_length': 4
        }, {
          'max_length': 8
        });
        _ref = [null, '', 'a', 'app'];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          value = _ref[_i];
          this.v.isValid({
            name: value
          });
          expect(this.v.errors_array()).toContain('name is too short. It must be atleast 4 characters long');
          expect(this.v.errors_array().length).toBe(1);
        }
        _ref1 = ['testingit', '3990182982', 1928391283];
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          value = _ref1[_j];
          this.v.isValid({
            name: value
          });
          expect(this.v.errors_array()).toContain('name is too long. It can be atmost 8 characters long');
          _results.push(expect(this.v.errors_array().length).toBe(1));
        }
        return _results;
      });
    });
  });

}).call(this);