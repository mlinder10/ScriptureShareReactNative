import { getBibleVersions, getBooks, getChapter, getChapters } from "./config/helpers";

async function test() {
  const bibles = await getBibleVersions();
  if (bibles === null) return;
  const books = await getBooks(bibles[2].id);
  if (books === null) return;
  const chapters = await getChapters(bibles[2].id, books[0].id);
  if (chapters === null) return;
  const chapter = await getChapter(bibles[3].id, chapters[1].id);
  console.log(chapter)
}

test();
