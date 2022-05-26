import { fileUpload } from "../../helpers/fileUpload";

describe('Test fileUpload', () => {
    test('should load a file and return URL', async () => {
        const imgUrl = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
        
        const resp = await fetch( imgUrl );
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');
        const url = await fileUpload(file);

        expect( typeof url ).toBe('string');

    });

    test('should return error', async () => {

        const file = new File([], 'foto.png');
        const url = await fileUpload(file);

        expect( url ).toBe(null);

    });
})