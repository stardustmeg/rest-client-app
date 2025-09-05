'use server';

import pcg from 'postman-code-generators';

export async function getLanguageList() {
  return await pcg.getLanguageList();
}
