import { awkjs } from '../dist/';
import { expect } from 'chai';


describe('test awkjs', function () {
    it('GNU AWK 5.1', async () => {
        const { awk } = await awkjs();
        const p = awk('', '', ['-V']).stdout;
        expect(p).to.contains('5.1');
    });

    it('replace a word', async () => {
        const { awk } = await awkjs();
        const p = awk('Hello World', '{$2="AWK"; print $0}', []).stdout;
        expect(p).to.equals('Hello AWK');
    });

    it('regex example', async () => {
        const { awk } = await awkjs();
        const p = awk('AWK is an awesome!\nIt is usefully.\nAWK is cool.', '/^AWK/', []).stdout;
        expect(p).to.equals('AWK is an awesome!\nAWK is cool.');
    });

    it('use function', async () => {
        const { awk } = await awkjs();
        const p = awk('JAVA code\nphp code\nJava tests', 'tolower($0) ~ /^java/;', []).stdout;
        expect(p).to.equals('JAVA code\nJava tests');
    });

    it('input is invalid"', async () => {
        const { awk } = await awkjs();
        const p = awk('":', '!#@@$%', []).stderr;
        expect(p).to.contains('syntax error');
    });
})