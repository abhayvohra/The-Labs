function createForm() {
  const form = FormApp.create('The Labs — Contact');
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);

  const nameItem = form.addTextItem();
  nameItem.setTitle('Name').setRequired(true);

  const emailItem = form.addTextItem();
  emailItem.setTitle('Email').setRequired(true);

  const interestItem = form.addListItem();
  interestItem.setTitle("I'm interested in").setRequired(true).setChoiceValues([
    'Research Partnership and Collaboration',
    'Learning Platform',
    'Something Else'
  ]);

  const messageItem = form.addParagraphTextItem();
  messageItem.setTitle('Message').setRequired(true);

  // Log everything you need
  const formUrl = form.getPublishedUrl();
  const editUrl = form.getEditUrl();
  const formId = form.getId();

  Logger.log('Form ID: ' + formId);
  Logger.log('Published URL: ' + formUrl);
  Logger.log('Edit URL: ' + editUrl);

  // Log entry IDs for each field
  const items = form.getItems();
  items.forEach(item => {
    Logger.log(item.getTitle() + ' → entry ID: ' + item.getId());
  });
}