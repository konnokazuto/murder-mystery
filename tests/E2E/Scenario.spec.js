describe("Scenario component", () => {
  beforeAll(async () => {
    // テストを始める前にアプリケーションを開く
    await page.goto("http://localhost:3000");
  });

  it("should render the scenario correctly", async () => {
    // レンダリングが正しく行われることを確認
    const faceImage = await page.$("img");
    expect(faceImage).not.toBeNull();

    const speaker = await page.$eval("p", (el) => el.textContent);
    expect(speaker).toContain("女「早」"); // 最初はテキストが空

    const nextButton = await page.$("button");
    expect(nextButton).not.toBeNull();
  });

  it("should animate the text", async () => {
    // テキストがアニメーション表示されることを確認
    await page.waitForTimeout(1000); // アニメーションが進行するのを待つ

    const speaker = await page.$eval("p", (el) => el.textContent);
    expect(speaker).not.toContain("「」"); // テキストが表示されている
  });

  it("should change the text when next button is clicked", async () => {
    // テキストがボタンクリックで変わることを確認
    const nextButton = await page.$("button");
    expect(nextButton).not.toBeNull();

    // クリック前のテキストを取得
    let beforeClickText = await page.$eval("p", (el) => el.textContent);

    // ボタンをクリック
    await nextButton.click();

    // ページの反応を待つ
    await page.waitForTimeout(1000);

    // クリック後のテキストを取得
    let afterClickText = await page.$eval("p", (el) => el.textContent);

    // テキストが変わったことを確認
    expect(beforeClickText).not.toEqual(afterClickText);
  });
});
