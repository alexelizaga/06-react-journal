describe('Test fileUpload', () => {

    test('should load a file and return URL', async () => {
        const fileName = 'test';
        const imgUrl = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
        
        const resp = await fetch( imgUrl );
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');
        console.log( file, fileName );
        // const url = await fileUpload(file, imgName);

        
    });

    test('should return error', () => {});

})