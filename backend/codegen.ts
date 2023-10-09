import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/graphql/modules/**/*.graphql',
  generates: {
    './src/types/graphqlTypesGenerated.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: './types#CustomContext',
      },
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
