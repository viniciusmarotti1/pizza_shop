import { expect, test } from '@playwright/test'

test('sign-up successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do estabelecimento').fill('Pizza Shop')
  await page.getByLabel('Seu nome').fill('Marotti')
  await page.getByLabel('Seu e-mail').fill('fulano@exemplo.com')
  await page.getByLabel('Seu celular').fill('1203742146')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Restaurante cadastrado com sucesso.')

  expect(toast).toBeVisible()
})

test('error to register new restaurant', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do estabelecimento').fill('Wrong name')
  await page.getByLabel('Seu nome').fill('Marotti')
  await page.getByLabel('Seu e-mail').fill('fulano@exemplo.com')
  await page.getByLabel('Seu celular').fill('1203742146')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Erro ao cadastrar restaurante.')

  await expect(toast).toBeVisible()
})

test('navigate back to login page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Fazer login' }).click()

  expect(page.url()).toContain('/sign-in')
})
