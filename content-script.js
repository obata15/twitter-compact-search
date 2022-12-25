function compact (article) {
  const tweetText = article.querySelector('[data-testid="tweetText"]');
  if (tweetText) {
    tweetText.style = "white-space: normal;";
  }

  const textPhotoMenu = tweetText?.parentElement?.parentElement;
  if (textPhotoMenu) {
    textPhotoMenu.style = "display: block";

    const mediaContainer = textPhotoMenu.querySelector('[aria-labelledby^="id"]');

    if (mediaContainer) {
      mediaContainer.style = "float: right; margin-top: 0; margin-left: 12px; width: 150px; height: 100px;";

      const mediaInnerContainer = mediaContainer?.firstChild?.firstChild?.firstChild;
      if (mediaInnerContainer) {
        mediaInnerContainer.style = "max-height: 100px;";
      }

      textPhotoMenu.insertBefore(mediaContainer, textPhotoMenu.firstChild)
  
      const retweet = mediaContainer.querySelector('[tabindex="0"]');
      if (retweet) {
        retweet.style = "max-height: 100px;"
      }

      const cardSmallMedia = mediaContainer.querySelector('[data-testid="card.layoutSmall.media"]');
      const cardSmallText = cardSmallMedia?.nextSibling;
      if (cardSmallText) {
        cardSmallText.style = "margin-left: -90px; background: rgba(0,0,0,0.5);";
      }
      const cardSmallDetail = mediaContainer.querySelector('[data-testid="card.layoutSmall.detail"]');
      const cardSmallSiteDomain = cardSmallDetail?.firstChild;
      if (cardSmallSiteDomain) {
        cardSmallSiteDomain.style = "color: white;";
      }

      const cardLargeMedia = mediaContainer.querySelector('[data-testid="card.layoutLarge.media"]');
      const cardLargeText = cardLargeMedia?.nextSibling;
      if (cardLargeText) {
        cardLargeText.style = "margin-top: -90px; background: rgba(0,0,0,0.5);";
      }
      
      const cardLargeDetail = mediaContainer.querySelector('[data-testid="card.layoutLarge.detail"]');
      const cardLargeSiteDomain = cardLargeDetail?.firstChild;
      if (cardLargeSiteDomain) {
        cardLargeSiteDomain.style = "color: white;";
      }
    }
  }

  const showThread = article.children?.[0].children?.[1];
  if (showThread) {
    showThread.remove();
  }
}

const timelineLabels = [
  '[aria-label="Timeline: Search timeline"]',
  '[aria-label="タイムライン: タイムラインを検索"]'
];

const mutationObserver = new MutationObserver((mutationRecords) => {
  mutationRecords.forEach((mutationRecord) => {
    const timeline = mutationRecord.target.querySelector(timelineLabels);

    if (timeline) {
      const userCells = timeline.querySelectorAll('[data-testid="UserCell"]');
      userCells.forEach((userCell) => {
        userCell.remove();
      });
  
      const h2s = timeline.querySelectorAll('h2');
      h2s.forEach((h2) => {
        h2.remove();
      });
  
      const showAlls = timeline.querySelectorAll('[href$="&f=user"]');
      showAlls.forEach((showAll) => {
        showAll.remove();
      });
    }

    const articles = mutationRecord.target.querySelectorAll(timelineLabels.map((timelineLabel) => timelineLabel + " article"));
    for (let article of articles) {
      compact(article);
    }
  })
});

mutationObserver.observe(
  document.body,
  { childList: true, subtree: true }
);
