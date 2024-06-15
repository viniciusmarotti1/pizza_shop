import { expect, test } from '@playwright/test'

test('sign-in successfully', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Seu e-mail').fill('fulano@exemplo.com')

  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByText('Eviamos um link de autenticação no seu email.')

  await expect(toast).toBeVisible()
})

test('sign-in with wrong credentials', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Seu e-mail').fill('wrongemail@email.com')

  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByText('Email inválido.')

  await expect(toast).toBeVisible()
})

test('navigate to register restaurant page', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Novo estabelecimento' }).click()

  expect(page.url()).toContain('/sign-up')
})
