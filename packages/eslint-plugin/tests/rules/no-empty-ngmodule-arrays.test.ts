import {
  convertAnnotatedSourceToFailureCase,
  RuleTester,
} from '@angular-eslint/utils';
import rule, {
  MessageIds,
  RULE_NAME,
} from '../../src/rules/no-empty-ngmodule-arrays';

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
});

const messageId: MessageIds = 'noEmptyNgmoduleArrays';

ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      code: `
      @NgModule({
        imports: [
          _foo,
          AModule,
          bModule,
          cModule,
          DModule,
        ],
        bootstrap: [
          AppModule1,
          AppModule2,
          AppModule3,
        ],
        declarations: [
          AComponent,
          bDirective,
          cPipe,
          DComponent
        ],
        providers: [
          {
            provide: 'myprovider',
            useClass: MyProvider,
          },
        ],
        schemas: [
            Schema,
        ],
      })
      class Test {}
      `,
    },
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      messageId,
      description: 'it should fail if imports array is empty',
      annotatedSource: `
      @NgModule({
        imports: []
                 ~~
      })
      class Test {}
      `,
    }),
    convertAnnotatedSourceToFailureCase({
      messageId,
      description: 'it should fail if declarations array is empty',
      annotatedSource: `
      @NgModule({
        declarations: [],
                      ~~
      })
      class Test {}
      `,
    }),
    convertAnnotatedSourceToFailureCase({
      messageId,
      description: 'it should fail if exports array is empty',
      annotatedSource: `
      @NgModule({
        exports: [],
                 ~~
      })
      class Test {}
      `,
    }),
    convertAnnotatedSourceToFailureCase({
      messageId,
      description: 'it should fail if bootstrap array is empty',
      annotatedSource: `
      @NgModule({
        bootstrap: [],
                   ~~
      })
      class Test {}
      `,
    }),
    convertAnnotatedSourceToFailureCase({
      messageId,
      description: 'it should fail if schemas array is empty',
      annotatedSource: `
      @NgModule({
        schemas: []
                 ~~
      })
      class Test {}
      `,
    }),
    convertAnnotatedSourceToFailureCase({
      messageId,
      description: 'it should fail if providers array is empty',
      annotatedSource: `
      @NgModule({
        providers: [],
                   ~~
      })
      class Test {}
      `,
    }),
    convertAnnotatedSourceToFailureCase({
      description: 'it should indicate multiple failures',
      annotatedSource: `
      @NgModule({
        imports: [
          _foo,
          AModule,
          bModule,
          cModule,
          DModule,
        ],
        bootstrap: [],
                   ~~
        declarations: [
          AComponent,
          bDirective,
          cPipe,
          DComponent
        ],
        providers: [],
                   ^^
        schemas: [],
                 ##
      })
      class Test {}
      `,
      messages: [
        { char: '~', messageId },
        { char: '^', messageId },
        { char: '#', messageId },
      ],
    }),
  ],
});
