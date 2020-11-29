import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import i18n from '@/i18n'

extend('required', {
    ...required,
    message: () => i18n.t('validationMessages.required')
  });

extend('email', {
    ...email,
    message: () => i18n.t('validationMessages.email')
  });


extend('phoneNumber', {
  validate: (value) => {
    const numberRegex = new RegExp('^[0-9 ]*$')
    return numberRegex.test(value)
  },
  message: () => i18n.t('validationMessages.phoneNumber')
});
