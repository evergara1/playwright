import { test, expect } from '@playwright/test';

test("Declined Credit Card Payment", async ({ page }) => {
  test.setTimeout(300_000);


  // 1. Navigate to homepage
  await page.goto('https://www.amaysim.com.au/');
  await page.waitForTimeout(2000)
  await expect(page.getByRole('link', { name: 'Amaysim', exact: true })).toBeVisible();

  
  // 2. Purchase the 7-day SIM plan
  
  // Select SIM plans
  await page.getByRole('link', { name: 'SIM plans', exact: true }).click();
  await expect(page.getByRole('heading', { name: '7 DAY SIM PLANS' })).toBeVisible();

  // Buy 7 Day SIM plan
  await page.locator('.product-card.product-card-plan.plan-.plan-hasflag-false.product-id-17160 > .product-card-bottom > .product-card-ctas > div > .btn').click();
  await page.waitForTimeout(2000)


  // 3. Checkout order of new number and physical SIM
 
  // Select pick a new number as your mobile number
  await page.getByText('pick a new number').first().click();

  // Select Physical SIM as type of SIM
  await page.locator('.css-1ne7y3i > .css-ikyri5 > .css-kqzqgg > path').first().click();
 
  // Click checkout > button and your details page will display
  await page.getByTestId('product-checkout-button').click();
  await expect(page.getByRole('heading', { name: 'already with amaysim?' })).toBeVisible();

  
  // 4. Purchase as new customer and enter customer details

  // Select I'm new to amaysim button
  await page.locator('.css-kqzqgg > path').first().click();

  // Enter Customer first name in about you form
  await page.getByRole('textbox', { name: 'first name' }).click();
  await page.getByRole('textbox', { name: 'first name' }).fill('Test');

   // Enter Customer last name in about you form
  await page.getByRole('textbox', { name: 'last name' }).click();
  await page.getByRole('textbox', { name: 'last name' }).fill('Test');

  // Enter Customer date of birth in about you form
  await page.getByRole('textbox', { name: 'date of birth' }).click();
  await page.getByRole('textbox', { name: 'date of birth' }).fill('01/01/1998');
  
  // Enter Customer email address in about you form
  await page.getByRole('textbox', { name: 'email address' }).click();
  await page.getByRole('textbox', { name: 'email address' }).fill('test@yahoo.com');
  
  // Enter Customer password in about you form
  await page.getByRole('textbox', { name: 'create a password' }).click();
  await page.getByRole('textbox', { name: 'create a password' }).fill('testtestpassword');
  
  // Enter Customer contact number in about you form
  await page.getByRole('textbox', { name: 'contact number' }).click();
  await page.getByRole('textbox', { name: 'contact number' }).fill('0439731037');
  
  // Enter Customer home or work address in about you form
  await page.getByRole('textbox', { name: 'home or work address' }).click();
  await page.getByRole('textbox', { name: 'home or work address' }).fill('Level 6, 17-19 Bridge St, SYDNEY NSW 2000');
  await page.getByRole('option', { name: 'Level 6 17-19 Bridge St,' }).click();
  await page.waitForTimeout(2000)
  await expect(page.getByRole('textbox', { name: 'home or work address' })).toHaveValue('Level 6 17-19 Bridge St, SYDNEY NSW 2000');
  

  // 5. Enter Declined card
  
  // Select Card as payment method
  await page.waitForSelector('iframe[title="Secure payment input frame"]', { timeout: 50000 });
  const paymentIframeLocator = 'iframe[title="Secure payment input frame"]';
  const stripeFrameContext = page.frameLocator(paymentIframeLocator);
  await stripeFrameContext.getByTestId('card').click();
  await page.waitForTimeout(2000)

  // Enter Customer invalid Card number
  await stripeFrameContext.getByRole('textbox', { name: 'Card number' }).click();
  await stripeFrameContext.getByRole('textbox', { name: 'Card number' }).fill('4242 4242 4242 4242');

  // Enter Customer invalid Expiration
  await stripeFrameContext.getByRole('textbox', { name: 'Expiration date MM / YY' }).click();
  await stripeFrameContext.getByRole('textbox', { name: 'Expiration date MM / YY' }).fill('01 / 27');

  // Enter Customer invalid Security code
  await stripeFrameContext.getByRole('textbox', { name: 'Security code' }).click();
  await stripeFrameContext.getByRole('textbox', { name: 'Security code' }).fill('123');


  // 6. Pay Now using invalid credit card details
  
  // Click Acknowledgement
  await expect(page.locator('div:nth-child(9)')).toBeVisible();
  await page.pause();
  await page.waitForTimeout(2000)
  await expect(page.locator('.css-c5g9lg > .css-1u4x94i > .css-1ne7y3i > .css-1417z9a')).toBeVisible();
  await expect(page.locator('.css-c5g9lg > .css-1u4x94i > .css-1ne7y3i > .css-1417z9a > .css-kqzqgg > path')).toBeVisible();
  await page.pause();
  await page.waitForTimeout(2000)
  await page.locator('.css-c5g9lg > .css-1u4x94i > .css-1ne7y3i > .css-1417z9a').click();
  await page.locator('.css-c5g9lg > .css-1u4x94i > .css-1ne7y3i > .css-1417z9a > .css-kqzqgg').click();
  await page.pause();
  await page.waitForTimeout(2000)

  // Click pay now button
  await expect(page.locator('div').filter({ hasText: /^pay now$/ }).nth(1)).toBeVisible();
  await expect(page.getByRole('button', { name: 'pay now' })).toBeVisible();
  await page.getByRole('button', { name: 'pay now' }).click();
  await page.pause();
  await page.waitForTimeout(2000)


  // 7. Validate expected error message for credit card payment
  await expect(page.getByText('Credit Card payment failed')).toBeVisible();
  await page.pause();
  await page.waitForTimeout(2000)

});
