const axios = require('axios').default;

const sourceUrl = process.env.SOURCEURL;
const destUrl = process.env.DESTURL;
const destToken = process.env.DESTTOKEN;
const sourceToken = process.env.SOURCETOKEN;

const adminUrl = '/content-manager/collection-types/application::';

axios.defaults.validateStatus = function () {
    return true;
};

const contents = [
  'api-menu',
  'api-page',
  'api-usecase',
  'api-bok',
];

const cleanComponentIds = (contentItem) => {
  delete contentItem.created_by;
  delete contentItem.updated_by;
  ['content', 'items', 'leftSidebar'].forEach((property) => {
    if (contentItem[property]) {
      contentItem[property].forEach((subItem) => {
        delete subItem.id;
      });
    };
  });
};

(async () => {

  for (const content of contents) {

    const contentItems = await axios.request({
      url: `${sourceUrl}${adminUrl}${content}.${content}`,
      headers: {
        'Authorization': `Bearer ${sourceToken}`,
      },
    });

    for (const contentItem of contentItems.data.results) {
      const destContentItem = await axios.request({
        url:`${destUrl}${adminUrl}${content}.${content}?slug=${contentItem.slug}`,
        headers: {
          'Authorization': `Bearer ${destToken}`,
        },
      });
      if (destContentItem.data.results.length) {
        contentItem.id = destContentItem.data.results[0].id;
        cleanComponentIds(contentItem);
        const result = await axios.request({
          method: 'PUT',
          url: `${destUrl}${adminUrl}${content}.${content}/${destContentItem.data.results[0].id}`,
          headers: {
            'Authorization': `Bearer ${destToken}`,
          },
          data: contentItem,
        });
        // console.log('\n\n\n');
        // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        console.log(content, 'updated', result.status, destContentItem.data.results[0].slug)
      } else {
        delete contentItem.id;
        cleanComponentIds(contentItem);
        const result = await axios.request({
          method: 'POST',
          url: `${destUrl}${adminUrl}${content}.${content}/`,
          headers: {
            'Authorization': `Bearer ${destToken}`,
          },
          data: contentItem,
        });
        // console.log('\n\n\n');
        // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        console.log(content, 'created', result.status, contentItem.slug)
      }
    }
  }
})();
