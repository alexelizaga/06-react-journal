import { fileUpload } from '../../helpers/fileUpload';

// cloudinary.config({
//     cloud_name: 'dkywmxeek',
//     api_key: '467387842848931',
//     api_secret: '2wJO5Vh0IYzTYPFdb6w-pynhHYQ' 
// });

describe('Test fileUpload', () => {

    test('should load a file and return URL', async () => {
        const imgUrl = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
        
        const resp = await fetch( imgUrl );
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');
        // const url = await fileUpload(file);

        // expect( typeof url ).toBe('string');

        // const segments = url.split('/');
        // const imageId = segments[ segments.length - 1 ].replace('.png', '');
        // console.log(imageId);
      
        // cloudinary.v2.api.delete_resources(imageId, {}, () => {
        //     done();
        // } );

        // cloudinary.v2.uploader.destroy(imageData.public_id, function(error,result))

    });

    test('should return error', async () => {

        const file = new File([], 'foto.png');
        const url = await fileUpload(file);

        expect( url ).toBe(null);

    });
})