import sinon from 'sinon';

export default class TestUtils {

    // The purpose of this function is to fail if any console errors are generated.
    // One of the main causes being where "props" to not match the component "propType" definition.
    static noConsoleErrors() {
        beforeEach(() => {
            sinon.stub(console, 'error');
        });

        afterEach(() => {
            sinon.assert.notCalled(console.error);
            console.error.restore();
        });
    }
}
