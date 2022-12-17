import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { yupResolver } from '@hookform/resolvers/yup';
import { UilTimes, UilCloudUpload } from '@iconscout/react-unicons';

import { FormEditor, FormInput, FormRadio, FileInput } from '@/shared-components/forms';
import { useMutation } from '@apollo/client';
import { CREATE_COMMUNITY, GET_COMMUNITIES, EDIT_COMMUNITY } from '@/graphql/community';

import { schema } from './schema';
import Dropzone from 'react-dropzone';
import { CommunityFormFields, CommunityFormPropsTypes } from './types';
import { getInitialValues } from './initialValues';
import { CoverPhotoUploadForm } from '@/shared-components/cover-photo-upload-form';

const CommunityForm: React.FC<CommunityFormPropsTypes> = ({
	setIsOpen,
	companySlug,
	community,
}) => {
	const {
		register,
		control,
		handleSubmit,
		reset,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<CommunityFormFields>({
		mode: 'onSubmit',
		resolver: yupResolver(schema),
		defaultValues: getInitialValues(community),
	});
	const [createCommunity, { loading }] = useMutation(CREATE_COMMUNITY);
	const [editCommunity, { loading: editLoading }] = useMutation(EDIT_COMMUNITY);

	const onSubmit = handleSubmit(async input => {
		console.log(input);
		const { coverImage, profile, ...restInput } = input;
		// if (!community?.id) {
		// 	try {
		// 		const response = await createCommunity({
		// 			variables: {
		// 				input: { ...restInput, companyId: companySlug },
		// 				profile: profile?.[0],
		// 				coverImage: coverImage?.[0],
		// 			},
		// 			refetchQueries: [{ query: GET_COMMUNITIES, variables: { companyId: companySlug } }],
		// 		});

		// 		if (response) {
		// 			setIsOpen(false);
		// 			reset();
		// 		}
		// 	} catch (e) {
		// 		console.log(e, '####');
		// 	}
		// } else {
		// 	try {
		// 		const response = await editCommunity({
		// 			variables: {
		// 				communityId: community.id,
		// 				input: { ...restInput },
		// 				profile: profile?.[0],
		// 				coverImage: coverImage?.[0],
		// 			},
		// 			refetchQueries: [{ query: GET_COMMUNITIES, variables: { companyId: community.id } }],
		// 		});

		// 		if (response) {
		// 			setIsOpen(false);
		// 			reset();
		// 		}
		// 	} catch (e) {
		// 		console.log(e, '####');
		// 	}
		// }
	});

	return (
		<>
			<form onSubmit={onSubmit} className='md:px-3'>
				<p className='font-semibold mb-10 text-gray-600 text-xl'>Create a new community</p>
				{/* <FileInput
					label='Upload profile picture of community'
					control={control}
					name={'profile'}
					multiple={false}
					initialValues={community?.profile}
					renderUpload={(onDrop, files, handleRemove) => {
						return (
							<Dropzone onDrop={onDrop} files={files}>
								{({ getRootProps, getInputProps }) => (
									<section>
										<div {...getRootProps()}>
											<input {...getInputProps()} />
											{files.length > 0 ? (
												files.map(file => {
													return (
														<div className='file-preview relative' key={file.name}>
															<Image
																src={file.preview}
																alt={file.name || 'avatar'}
																width={100}
																height={100}
																className='object-cover rounded-full'
															/>
															<span onClick={() => handleRemove(file)}>
																<UilTimes size={20} />
															</span>
														</div>
													);
												})
											) : (
												<div className='bg-gray-100 h-28 overflow-hidden relative rounded-full w-28 hover:brightness-50'>
													<div className='flex h-full items-center justify-center rounded-md w-full'>
														<UilCloudUpload size={25} />
													</div>
												</div>
											)}
										</div>
									</section>
								)}
							</Dropzone>
						);
					}}
					labelClassName='mt-4'
					errors={errors}
				/> */}

				<div className='w-full'>
					<FormInput
						name={`name`}
						id='name'
						label='Name*'
						className='pr-5'
						placeholder='Name of a community'
						register={register}
						errors={errors}
					/>
				</div>
				<p className='font-semibold mb-4 text-grey-600'>Community Privacy</p>
				<div className='flex mb-5'>
					<div className='w-1/2'>
						<FormRadio
							id='private'
							name='type'
							labelClassName='mb-0'
							value='PRIVATE'
							label='Private'
							className='mr-2'
							inputClassName='bg-gray-200'
							register={register}
							errors={errors}
							helperText='Only member given access can join.'
						/>
					</div>
					<div className='w-1/2'>
						<FormRadio
							id='public'
							name='type'
							value='PUBLIC'
							label='Public'
							className='mr-2'
							inputClassName='bg-gray-200'
							labelClassName='mb-0'
							register={register}
							errors={errors}
							helperText='Any of your follower can join this community.'
						/>
					</div>
				</div>
				<div className='w-full md:pt-6'>
					<FormEditor
						id='description'
						name={`description`}
						label='Description*'
						placeholder='Write a description'
						control={control}
						errors={errors}
					/>
				</div>
				{/* {getValues('coverPicture')?.length
					? getValues('coverPicture').map((image: any, index: any) => {
							return (
								<div className='h-72 mt-5 relative rounded-md w-96' key={index}>
									<button
										type='button'
										onClick={() => onSelectedImageRemoveHandler(image)}
										className='-mr-2 -mt-2 absolute bg-gray-300 flex h-6 items-center justify-center outline outline-4 outline-offset-0 outline-white right-0 rounded-full w-6 z-50'>
										<AiOutlineClose size={20} />
									</button>
									<Image
										className='object-cover rounded-md'
										alt='test'
										src={URL.createObjectURL(image)}
										fill
									/>
								</div>
							);
					  })
					: ''} */}
				{/* {!getValues('coverPicture')?.length && (
					<>
						<label className='flex font-semibold items-center mb-0 mt-4 text-gray-700 text-sm tracking-wide uppercase'>
							Cover photo
						</label>
						<div className='bg-gray-100 cursor-pointer flex h-72 justify-center mt-5 p-5 rounded-md w-96'>
							<FormDropFile
								label={'Cover picture'}
								control={control}
								name={'coverPicture'}
								errors={errors}
								onDrop={onDrop}
								isHidden={false}
							/>
						</div>
						<p className='block text-left text-red-600 text-sm'>{errors?.profilePicture?.message}</p>
					</>
				)} */}
				{/* <FileInput
					label='Cover photo'
					control={control}
					name={'coverPicture'}
					multiple={false}
					defaultValue={community?.coverPicture}
					uploadComponent={<CoverPhotoUploadForm />}
					labelClassName='mt-4'
					errors={errors}
				/> */}
				<FileInput
					label='Cover Photo'
					control={control}
					name='coverImage'
					multiple={false}
					initialValues={community?.coverImage}
					setValue={setValue}
					renderUpload={(onDrop, files, handleRemove) => {
						console.log('files', files);
						return (
							<Dropzone onDrop={onDrop}>
								{({ getRootProps, getInputProps }) => (
									<section>
										<div {...getRootProps()}>
											<input {...getInputProps()} />
											{files.length > 0 ? (
												files.map(file => {
													return (
														<div className='file-preview relative' key={file.name}>
															<Image
																src={file.preview}
																alt={file.name || 'avatar'}
																width={200}
																height={200}
																className='object-cover rounded-md'
															/>
															<span onClick={() => handleRemove(file)}>
																<UilTimes size={20} />
															</span>
														</div>
													);
												})
											) : (
												<CoverPhotoUploadForm />
											)}
										</div>
									</section>
								)}
							</Dropzone>
						);
					}}
					labelClassName='mt-4'
					errors={errors}
				/>
				<div className='flex justify-center mb-5 mt-5'>
					<button
						disabled={isSubmitting}
						className='bg-primary p-3 rounded-md text-white text-xl w-full disabled:opacity-50'>
						{isSubmitting ? 'Submitting' : community?.id ? 'Edit Community' : 'Add Community'}
					</button>
				</div>
				<div className='p-5'></div>
			</form>
		</>
	);
};

export default CommunityForm;
