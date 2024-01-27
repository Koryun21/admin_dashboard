const MAX_NEARBY_PAGES = 4;
const NEARBY_PAGES = 3;
const PREV_PAGE_SPACING = 2;
const NEXT_PAGE_SPACING = 1;
const FIRST_PAGE = 1;

export const getPaginationItems = (
  pagesCount: number,
  currentPage: number,
): (number | string)[] => {
  const numbersArray = Array.from(
    { length: pagesCount },
    (_, index) => index + 1,
  );

  const nearItems = numbersArray.slice(
    Math.max(
      Math.min(currentPage, pagesCount - PREV_PAGE_SPACING) - PREV_PAGE_SPACING,
      FIRST_PAGE,
    ),
    Math.max(
      Math.min(currentPage, pagesCount - PREV_PAGE_SPACING) + NEXT_PAGE_SPACING,
      MAX_NEARBY_PAGES,
    ),
  );

  const first =
    currentPage - NEARBY_PAGES >= FIRST_PAGE
      ? [FIRST_PAGE, '...']
      : [FIRST_PAGE];
  const last =
    currentPage + NEARBY_PAGES <= pagesCount
      ? ['...', pagesCount]
      : [pagesCount];

  if (pagesCount - PREV_PAGE_SPACING >= MAX_NEARBY_PAGES) {
    return [...first, ...nearItems, ...last];
  }

  return numbersArray;
};
