var Core;
(function (Core) {
    var Person = (function () {
        function Person(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.fullName = firstName + ' ' + lastName;
        }
        return Person;
    })();
    Core.Person = Person;
})(Core = exports.Core || (exports.Core = {}));
