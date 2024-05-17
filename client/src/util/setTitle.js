export const setTitle = (titleText) => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = "밥박사 :: " + titleText;
};
