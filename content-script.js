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
