import React from "react";

export const previewArea = ({
                                input,
                                preview,
                                onClick,
                                meta: {touched, error, warning}
                            }) => {
    return <div className="form-group">
        <div className="upload-area rounded" aria-disabled="false" onClick={onClick}
             style={ {backgroundImage: preview ? 'url('+preview+')': ''} }>
                <span className="btn btn-dashed-grey rounded-circle center upload-button">
                    <i className="fa fa-plus" />
                </span>
        </div>
        <input type="hidden" {...input} />
        {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
            (warning && <span className="text-warning">{warning}</span>))}
    </div>
};

export const autoCompleteInput = ({
                                      input,
                                      onKeyDown,
                                      className,
                                      label,
                                      meta: {touched, error, warning}
                                  }) => {
    return <div className="form-group">
        <input {...input} onKeyDown={onKeyDown} className={className} placeholder={label} type={"text"}
               autoComplete={(new Date).getTime()}/>
        {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
            (warning && <span className="text-warning">{warning}</span>))}
    </div>
};

export const inputType = ({
                              input,
                              className,
                              label,
                              type,
                              meta: {touched, error, warning}
                          }) => {
    return <div className="form-group">
        <input {...input} className={className} placeholder={label} type={type}/>
        {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
            (warning && <span className="text-warning">{warning}</span>))}
    </div>
};

export const text = ({
                         input,
                         className,
                         label,
                         type,
                         meta: {touched, error, warning}
                     }) => (
    <div className="form-group">
        <textarea {...input} className={className} placeholder={label} type={type} />
        {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
            (warning && <span className="text-warning">{warning}</span>))}
    </div>
);

export const textGroup = ({
                              input,
                              disabled,
                              className,
                              label,
                              type,
                              meta: {touched, error, warning}
                          }) => (
    <div className="input-group">
        <textarea {...input} className={className} placeholder={label} type={type}/>
        {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
            (warning && <span className="text-warning">{warning}</span>))}
        <button type="submit" className="input-group-addon btn btn-azure " disabled={disabled}>
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
        </button>
    </div>
);

export const formGroup = ({
                              input,
                              className,
                              label,
                              type,
                              meta: {touched, error, warning}
                          }) => (
    <div className={"form-group"}>
        <div className="input-group">
            <input {...input} className={className} placeholder={label} type={type}/>
            <div className="input-group-append">
                <div className="input-group-text">
                    <select name="currency">
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                </div>
            </div>
        </div>
        {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
            (warning && <span className="text-warning">{warning}</span>))}
    </div>
);
export const terms = ({
                          input,
                          className,
                          type,
                          meta: {touched, error, warning}
                      }) => (
    <div className="form-group">
        <input {...input} className={className} id={className} type={type}/>
        <label htmlFor={className}>I agree to the <a href="">Terms and
            Conditions</a></label>
        {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
            (warning && <span className="text-warning">{warning}</span>))}
    </div>
);
export const genderType = ({
                               input,
                               meta: {touched, error, warning}
                           }) => (
    <div className="form-group">
        <div className="col-6">
            <input {...input} type="radio" id="gender_male" value="male"/>
            <label htmlFor="gender_male">Male</label>
        </div>
        <div className="col-6">
            <input {...input} type="radio" id="gender_female" value="female"/>
            <label htmlFor="gender_female">Female</label>
        </div>
        {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
            (warning && <span className="text-warning">{warning}</span>))}
    </div>
);
export const radioType = ({
                              input,
                              id,
                              className,
                              label,
                              type,
                              meta: {touched, error, warning}
                          }) => (
    <div className="form-group">
        <input {...input} className={className} id={id} type={type}/>
        <label htmlFor={id}>{label}</label>
        {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
            (warning && <span className="text-warning">{warning}</span>))}
    </div>
);
export const checkboxType = ({
                                 input,
                                 className,
                                 label,
                                 type,
                                 meta: {touched, error, warning}
                             }) => (
    <div className="form-group">
        <input {...input} className={className} placeholder={label} type={type}/>
        <label htmlFor={input.id}>{label}</label>
        {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
            (warning && <span className="text-warning">{warning}</span>))}
    </div>
);
export const selectType = ({
                               input,
                               className,
                               label,
                               type,
                               meta: {touched, error, warning}
                           }) => (
    <div className="form-group">
        <input {...input} className={className} placeholder={label} type={type}/>
        <label htmlFor={input.id}>{label}</label>
        {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
            (warning && <span className="text-warning">{warning}</span>))}
    </div>
);